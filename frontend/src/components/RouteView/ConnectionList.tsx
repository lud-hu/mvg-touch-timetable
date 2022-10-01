import { AppBar, Box, Dialog, Divider, IconButton, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { Connection } from "../Types";
import ConnectionEntry from "./ConnectionEntry";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import ConnectionDetails from "./ConnectionDetails";

interface ConnectionListProps {
  connections: Connection[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Lists all given connections.
 */
const ConnectionList: React.FC<ConnectionListProps> = (
  props: ConnectionListProps
) => {
  const [connectionDialogData, setConnectionDialogData] =
    useState<Connection>();

  useEffect(() => {
    console.log("Data", connectionDialogData);
  }, [connectionDialogData]);

  return (
    <Box>
      {props.connections.map((c, i) => (
        <React.Fragment key={i}>
          <ConnectionEntry
            connection={c}
            onClick={() => setConnectionDialogData(c)}
          />
          {i < props.connections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <Dialog
        fullScreen
        open={!!connectionDialogData}
        onClose={() => setConnectionDialogData(undefined)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setConnectionDialogData(undefined)}
              aria-label="close"
              sx={{ marginLeft: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {connectionDialogData && (
          <ConnectionDetails connection={connectionDialogData} />
        )}
      </Dialog>
    </Box>
  );
};

export default ConnectionList;
