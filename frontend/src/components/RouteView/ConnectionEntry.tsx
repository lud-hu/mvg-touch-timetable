import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import ProductsGrid from "../StationsGrid/ProductsGrid";
import { Connection, Products } from "../Types";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

dayjs.extend(relativeTime);

export interface RouteEntryProps {
  connection: Connection;
}

/**
 * One list entry that shows a possible connection with its:
 * - entry vehicle + direction
 * - departure and arrival time
 * - possible delays
 */
const ConnectionEntry: React.FC<RouteEntryProps> = (props: RouteEntryProps) => {
  const ConnectionEntryTitle = (props: RouteEntryProps) => {
    const departureConnection = props.connection.connectionPartList[0];
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ProductsGrid products={[departureConnection.product as Products]} />
        <span>{departureConnection.label}</span>
        <ArrowRightAltIcon sx={{ color: "text.secondary" }} />
        <Box
          component="span"
          sx={{
            color: "text.secondary",
          }}
        >
          {departureConnection.destination}
        </Box>
        <Box component="span" sx={{ marginLeft: "auto" }}>
          {dayjs().to(
            dayjs(
              props.connection.departure + departureConnection.delay * 60 * 1000
            )
          )}
        </Box>
      </Box>
    );
  };

  const ConnectionDurationLine = (props: RouteEntryProps) => {
    const departureConnection = props.connection.connectionPartList[0];
    const arrivalConnection = props.connection.connectionPartList.slice(-1)[0];
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box
          sx={{ color: departureConnection.delay > 0 ? "error.main" : "unset" }}
        >
          {dayjs(
            props.connection.departure +
              (departureConnection.delay || 0) * 60 * 1000
          ).format("HH:mm")}
        </Box>
        <Divider
          sx={{
            my: 1,
            flexGrow: 1,
            "> span": {
              padding: 0,
            },
            "&::after, &::before": {
              borderColor: "rgb(189, 189, 189)",
            },
          }}
        >
          <Chip
            label={
              dayjs(props.connection.arrival).diff(
                props.connection.departure,
                "minute"
              ) + " min"
            }
            variant="outlined"
            size="small"
            sx={{ color: "text.disabled" }}
          />
        </Divider>
        <Box
          sx={{
            color: arrivalConnection.arrDelay > 0 ? "error.main" : "unset",
          }}
        >
          {dayjs(
            props.connection.arrival +
              (arrivalConnection.arrDelay || 0) * 60 * 1000
          ).format("HH:mm")}
        </Box>
      </Box>
    );
  };

  const InfoLine = (props: RouteEntryProps) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        fontWeight: "unset",
      }}
    >
      <span>
        {props.connection.connectionPartList.filter(
          (p) => p.connectionPartType !== "FOOTWAY"
        ).length - 1}{" "}
        Changes
      </span>
      {props.connection.connectionPartList[0].delay !== 0 && (
        <Box sx={{ color: "error.main" }}>
          + {props.connection.connectionPartList[0].delay} min
        </Box>
      )}
    </Box>
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={<ConnectionEntryTitle connection={props.connection} />}
        secondaryTypographyProps={{
          component: "div",
        }}
        secondary={
          <>
            <ConnectionDurationLine connection={props.connection} />
            <InfoLine connection={props.connection} />
          </>
        }
      />
    </ListItem>
  );
};

export default ConnectionEntry;
