import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

interface DepartureTimestampProps {
  time: number;
  delay?: number;
}

const DepartureTimestamp: React.FC<DepartureTimestampProps> = (
  props: DepartureTimestampProps
) => {
  return (
    <Typography
      sx={{
        display: "inline",
        color: props.delay && props.delay > 0 ? "error.main" : "unset",
      }}
    >
      {dayjs(props.time + (props.delay || 0) * 60 * 1000).format("HH:mm")}
    </Typography>
  );
};

export default DepartureTimestamp;
