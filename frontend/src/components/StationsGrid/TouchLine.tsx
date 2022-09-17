import { Box } from "@mui/material";
import React from "react";

interface TouchLineProps {
  start: [number, number] | undefined;
  stop: [number, number] | undefined;
}

const lineColor = "#eb0000";
const dotSize = 15;
const lineWidth = 3;

/**
 * Renders a line width handles on the screen from and to the given coordinates.
 */
const TouchLine: React.FC<TouchLineProps> = (props: TouchLineProps) => {
  if (!props.start || !props.stop) return null;

  return (
    <>
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          position: "absolute",
          background: lineColor,
          top: props.start[1],
          left: props.start[0],
        }}
      ></Box>
      <Box
        sx={{
          width: dotSize / 3,
          height: dotSize / 3,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          position: "absolute",
          background: "white",
          border: dotSize / 3 + "px solid " + lineColor,
          top: props.stop[1],
          left: props.stop[0],
          zIndex: 3,
        }}
      ></Box>
      <svg
        height="100vh"
        width="100vw"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        <line
          x1={props.start[0]}
          y1={props.start[1]}
          x2={props.stop[0]}
          y2={props.stop[1]}
          style={{
            stroke: lineColor,
            strokeWidth: lineWidth,
          }}
        />
      </svg>
    </>
  );
};

export default TouchLine;
