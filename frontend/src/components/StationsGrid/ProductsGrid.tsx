import { Box, Avatar } from "@mui/material";
import React from "react";
import { Products } from "../Types";

interface ProductsGridProps {
  size?: number;
  products: Products[];
}

/**
 * Displays a grid with icons for the given products in the given size (per icon).
 */
const ProductsGrid: React.FC<ProductsGridProps> = (
  props: ProductsGridProps
) => {
  const chooseIcon = (p: Products) => {
    switch (p) {
      case "BUS":
        return "/icons/bus.svg";
      case "SBAHN":
        return "/icons/sbahn.svg";
      case "TRAM":
        return "/icons/tram.svg";
      case "UBAHN":
        return "/icons/ubahn.svg";
      case "BAHN":
        return "/icons/bahn.svg";
      default:
        return "";
    }
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${props.products.length > 1 ? 2 : 1}, ${
        props.size || 20
      }px)`}
      gap={0.25}
    >
      {props.products.map((p) => (
        <Avatar
          key={p}
          alt={p}
          src={chooseIcon(p)}
          sx={{
            width: props.size || 20,
            height: props.size || 20,
            borderRadius: "unset",
          }}
        />
      ))}
    </Box>
  );
};

export default ProductsGrid;
