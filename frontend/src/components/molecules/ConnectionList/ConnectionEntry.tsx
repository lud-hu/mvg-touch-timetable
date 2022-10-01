import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Chip, Divider, ListItem, ListItemText } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import ProductsGrid from "../../atoms/Products/ProductsGrid";
import DepartureTimestamp from "../../pages/RouteView/DepartureTimestamp";
import { Connection, Products } from "../../Util/Types";

dayjs.extend(relativeTime);

export interface RouteEntryProps {
  connection: Connection;
  onClick?: () => any;
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
          width: "70%",
          minWidth: 275,
          margin: "auto",
        }}
      >
        <DepartureTimestamp
          time={props.connection.departure}
          delay={departureConnection.delay}
        />
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
        <DepartureTimestamp
          time={props.connection.arrival}
          delay={arrivalConnection.delay}
        />
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
          (p) => p.product !== "FOOTWAY"
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
    <ListItem
      alignItems="flex-start"
      onClick={props.onClick}
      sx={{
        cursor: props.onClick ? "pointer" : "unset",
      }}
    >
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
