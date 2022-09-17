import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { API_PATH } from "../Constants";
import { Connection } from "./Types";

interface RouteViewProps {
  test?: string;
}

const RouteView: React.FC<RouteViewProps> = (props: RouteViewProps) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const stop = searchParams.get("stop");
  const [isLoading, setIsLoading] = useState(false);

  const [conections, setConections] = useState<Connection[]>();

  useEffect(() => {
    if (start && stop) {
      setIsLoading(true);
      fetch(API_PATH + "/get_route?start=" + start + "&stop=" + stop)
        .then((response) => response.json())
        .then((data) => setConections(data))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!start || !stop) return <div>provide params!</div>;
  if (isLoading) return <CircularProgress />;
  if (!conections?.length) return <div>loading...</div>;

  return (
    <Box>
      <List sx={{ width: "100%" }}>
        <div>
          {conections[0].from.name} - {conections[0].to.name}
        </div>
        {conections.map((c) => (
          <React.Fragment key={c.departure}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={dayjs(c.departure).format("HH:mm")}
                secondaryTypographyProps={{
                  component: "div",
                }}
                secondary={
                  <React.Fragment>
                    <Box>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Duration:{" "}
                      </Typography>
                      {dayjs(c.departure).diff(c.arrival, "minute") * -1}
                    </Box>
                    <Box>
                      {c.connectionPartList.map((l, i) => (
                        <Box key={"partList" + c.departure + i}>
                          <Box>
                            {l.label}: {l.from.name} - {l.to.name}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RouteView;
