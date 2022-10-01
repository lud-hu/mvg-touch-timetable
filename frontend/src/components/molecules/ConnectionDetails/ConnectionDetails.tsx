import { Box, Typography } from "@mui/material";
import React from "react";
import ProductBadge from "../../atoms/Products/ProductBadge";
import DepartureTimestamp from "../../pages/RouteView/DepartureTimestamp";
import { getColorForProduct } from "../../Util/ProductsHelper";
import { Connection, ConnectionPartList, Products } from "../../Util/Types";

interface ConnectionDetailsProps {
  connection: Connection;
}

const FIRST_COL_WIDTH = 70;
const COLORED_LINE_WIDTH = 5;

const backgroundGradient = (colorTop: string, colorBottom: string) =>
  `linear-gradient(0deg, ${colorBottom} 40%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, ${colorTop} 60%);`;

const StationRow = ({
  connection,
  prevConnection,
}: {
  connection: ConnectionPartList;
  prevConnection?: ConnectionPartList;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "stretch",
    }}
  >
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        width: FIRST_COL_WIDTH + "px",
        textAlign: "center",
      }}
    >
      {prevConnection && (
        <DepartureTimestamp
          time={prevConnection.arrival}
          delay={prevConnection.arrDelay}
        />
      )}
      <DepartureTimestamp
        time={connection.departure}
        delay={connection.delay}
      />
    </Box>
    <Box
      sx={{
        width: COLORED_LINE_WIDTH + "px",
        background: backgroundGradient(
          prevConnection
            ? getColorForProduct(
                prevConnection.product as Products,
                prevConnection.label
              )
            : "transparent",
          getColorForProduct(connection.product as Products, connection.label)
        ),
        mr: 3,
      }}
    ></Box>
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
        py: 2,
      }}
    >
      {connection.from.name}
    </Typography>
  </Box>
);

const InnterconnectionRow = ({
  connection,
}: {
  connection: ConnectionPartList;
}) => (
  <Box
    sx={{
      bgcolor: "lightgray",
      display: "flex",
      alignItems: "stretch",
    }}
  >
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        width: FIRST_COL_WIDTH + "px",
        textAlign: "center",
        flexShrink: 0,
      }}
    >
      {connection.delay > 0 && (
        <Typography sx={{ color: "error.main" }}>
          + {connection.delay}
        </Typography>
      )}
    </Box>
    <Box
      sx={{
        flexShrink: 0,
        width: COLORED_LINE_WIDTH + "px",
        background: getColorForProduct(
          connection.product as Products,
          connection.label
        ),
        mr: 3,
      }}
    ></Box>
    <Box
      sx={{
        py: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <ProductBadge
        product={connection.product as Products}
        lineName={connection.label}
      />
    </Box>
    {connection.destination && (
      <Typography sx={{ display: "inline", pl: 2, py: 1 }}>
        {connection.destination}
      </Typography>
    )}
  </Box>
);

const FinalStationRow = ({ connection }: { connection: Connection }) => {
  const lastStation = connection.connectionPartList.slice(-1)[0];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: FIRST_COL_WIDTH + "px",
          textAlign: "center",
        }}
      >
        <DepartureTimestamp time={connection.arrival} />
      </Box>
      <Box
        sx={{
          width: COLORED_LINE_WIDTH + "px",
          background: backgroundGradient(
            getColorForProduct(
              lastStation.product as Products,
              lastStation.label
            ),
            "transparent"
          ),
          mr: 3,
        }}
      ></Box>
      <Typography sx={{ display: "flex", alignItems: "center", py: 2 }}>
        {connection.to.name}
      </Typography>
    </Box>
  );
};

/**
 * Renders a details list of the given connection with all
 * it's intermediate stops, departures and delays.
 */
const ConnectionDetails: React.FC<ConnectionDetailsProps> = (
  props: ConnectionDetailsProps
) => {
  return (
    <Box component="ul" sx={{ p: 0, m: 0 }}>
      {props.connection.connectionPartList.map((l, i, arr) => (
        <Box component="li" sx={{ display: "flex" }} key={l.label}>
          <Box sx={{ width: "100%" }}>
            <StationRow
              connection={l}
              prevConnection={i > 0 ? arr[i - 1] : undefined}
            />
            <InnterconnectionRow connection={l} />
          </Box>
        </Box>
      ))}
      <FinalStationRow connection={props.connection} />
    </Box>
  );
};

export default ConnectionDetails;
