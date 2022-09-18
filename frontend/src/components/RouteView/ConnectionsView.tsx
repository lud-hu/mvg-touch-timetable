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
import { API_PATH } from "../../Constants";
import ConnectionList from "./ConnectionList";
import { Connection } from "../Types";

interface RouteViewProps {
  test?: string;
}

const ConnectionsView: React.FC<RouteViewProps> = (props: RouteViewProps) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const stop = searchParams.get("stop");
  const [isLoading, setIsLoading] = useState(false);

  const [connections, setConnections] = useState<Connection[]>();

  useEffect(() => {
    if (start && stop) {
      setIsLoading(true);
      fetch(API_PATH + "/get_route?start=" + start + "&stop=" + stop)
        .then((response) => response.json())
        .then((data) => setConnections(data))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!start || !stop) return <div>provide params!</div>;
  if (isLoading) return <CircularProgress />;
  if (!connections?.length) return <div>loading...</div>;

  return (
    <Box>
      <List sx={{ width: "100%" }}>
        <div style={{ fontWeight: "bold" }}>
          {connections[0].from.name} - {connections[0].to.name}
        </div>
        <ConnectionList connections={connections} />
      </List>
    </Box>
  );
};

export default ConnectionsView;
