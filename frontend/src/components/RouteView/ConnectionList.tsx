import { Box, Divider } from "@mui/material";
import React from "react";
import { Connection } from "../Types";
import ConnectionEntry from "./ConnectionEntry";

interface ConnectionListProps {
  connections: Connection[];
}

/**
 * Lists all given connections.
 */
const ConnectionList: React.FC<ConnectionListProps> = (
  props: ConnectionListProps
) => {
  return (
    <Box>
      {props.connections.map((c, i) => (
        <React.Fragment key={i}>
          <ConnectionEntry connection={c} />
          {i < props.connections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ConnectionList;
