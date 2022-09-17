import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SxProps,
} from "@mui/material";
import { useState } from "react";
import Autocomplete from "../Autocomplete";
import { Station, StationDetails } from "../Types";
import ProductsGrid from "./ProductsGrid";

interface AddStationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onStationSelection: (station: Station) => void;
  onAbort: () => void;
}

const dummy = [
  {
    aliases: "Muenchen Munchen Ostpark MC",
    divaId: 1050,
    hasLiveData: false,
    hasZoomData: true,
    id: "de:09162:1050",
    latitude: 48.1184,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    link: "MC",
    longitude: 11.63144,
    name: "Michaelibad",
    place: "München",
    products: ["UBAHN", "BUS"],
    tariffZones: "m",
    type: "station",
  },
  {
    aliases: "Michael-Aumueller Aumuller FFB",
    divaId: 6161,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09179:6161",
    latitude: 48.20924,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 11.16525,
    name: "Michael-Aumüller-Straße",
    place: "Mammendorf (Obb.)",
    products: ["BUS"],
    tariffZones: "3|4",
    type: "station",
  },
  {
    aliases: " PUM",
    divaId: 2172,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09184:2172",
    latitude: 48.07728,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    link: "PUM",
    longitude: 11.72018,
    name: "Michael-Haslbeck-Straße",
    place: "Putzbrunn",
    products: ["BUS"],
    tariffZones: "m|1",
    type: "station",
  },
  {
    aliases: "",
    divaId: 2502467,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09186:2467",
    latitude: 48.52069,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 11.50122,
    name: "Michael-Weingartner-Straße",
    place: "Pfaffenhofen (Ilm)",
    products: ["BUS"],
    tariffZones: "",
    type: "station",
  },
  {
    aliases: "",
    divaId: 2414,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09184:2414",
    latitude: 47.94584,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 11.64412,
    name: "Michelistraße",
    place: "Lochhofen",
    products: ["BUS"],
    tariffZones: "1|2",
    type: "station",
  },
  {
    aliases: "Abzweigung Wiesmichl FFB",
    divaId: 6311,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09179:6311",
    latitude: 48.21996,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 11.13486,
    name: "Abzw. Wiesmichl",
    place: "Mammendorf (Obb.)",
    products: ["BUS"],
    tariffZones: "3|4",
    type: "station",
  },
  {
    aliases: "Sankt St",
    divaId: 2502460,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09186:2460",
    latitude: 48.52682,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 11.5149,
    name: "Kindergarten St. Michael",
    place: "Pfaffenhofen (Ilm)",
    products: ["BUS"],
    tariffZones: "",
    type: "station",
  },
  {
    aliases: "St Michael St. Muenchen Munchen SMI",
    divaId: 907,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09162:907",
    latitude: 48.12403,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    link: "JB",
    longitude: 11.63245,
    name: "Sankt Michael",
    place: "München",
    products: ["BUS"],
    tariffZones: "m",
    type: "station",
  },
  {
    aliases: "",
    divaId: 5536,
    hasLiveData: false,
    hasZoomData: false,
    id: "de:09188:5536",
    latitude: 48.02254,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 11.32129,
    name: "St.-Michael-Straße",
    place: "Hanfeld",
    products: ["BUS"],
    tariffZones: "2|3",
    type: "station",
  },
  {
    aliases: "Prag Bahnhof Bf.",
    divaId: 80004404,
    hasLiveData: false,
    hasZoomData: false,
    id: "cz:55100:5457226",
    latitude: 50.06094,
    lines: {
      bus: [],
      nachtbus: [],
      nachttram: [],
      otherlines: [],
      sbahn: [],
      tram: [],
      ubahn: [],
    },
    longitude: 14.40815,
    name: "Praha-Smichov",
    place: "Praha",
    products: ["BAHN"],
    tariffZones: "",
    type: "station",
  },
] as any;

const AddStationDialog: React.FC<AddStationDialogProps> = (
  props: AddStationDialogProps
) => {
  const [suggestionList, setSuggestionList] = React.useState<
    StationDetails[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const onStationSelection = (station: Station) => {
    props.onStationSelection(station);
    setSuggestionList(undefined);
    closeDialog();
  };

  const closeDialog = () => {
    setSuggestionList(undefined);
    props.setOpen(false);
  };

  const centeredStyle: SxProps = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Dialog
      open={props.open}
      onClose={() => closeDialog()}
      scroll="paper"
      fullScreen
    >
      <DialogTitle sx={{ p: 0 }}>
        <Autocomplete
          onStationsFound={setSuggestionList}
          onIsLoadingChange={setIsLoading}
        />
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box sx={centeredStyle}>
            <CircularProgress />
          </Box>
        ) : suggestionList && suggestionList.length > 0 ? (
          <List sx={{ width: "100%" }}>
            {suggestionList.map((l) => (
              <ListItem
                key={l.id}
                alignItems="flex-start"
                onClick={() =>
                  onStationSelection({
                    name: l.name,
                    id: l.id,
                  })
                }
              >
                <ListItemAvatar>
                  {l.products.length && (
                    <ProductsGrid size={20} products={l.products} />
                  )}
                </ListItemAvatar>
                <ListItemText primary={l.name} secondary={l.place} />
              </ListItem>
            ))}
          </List>
        ) : suggestionList ? (
          <Box sx={centeredStyle}>Keine Ergebnisse gefunden.</Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setSuggestionList(undefined);
            props.onAbort();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStationDialog;
