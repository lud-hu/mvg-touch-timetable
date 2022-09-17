import { ListItem, ListItemText, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Connection } from "../Types";

interface RouteEntryProps {
  connection: Connection;
}

const ConnectionEntry: React.FC<RouteEntryProps> = (props: RouteEntryProps) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={dayjs(props.connection.departure).format("HH:mm")}
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
              {dayjs(props.connection.departure).diff(
                props.connection.arrival,
                "minute"
              ) * -1}
            </Box>
            <Box>
              {props.connection.connectionPartList.map((l, i) => (
                <Box key={"partList" + props.connection.departure + i}>
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
  );
};

export default ConnectionEntry;
