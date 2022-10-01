import { Box, Avatar } from "@mui/material";
import React from "react";
import { Products } from "../../Util/Types";
import ProductIcon from "./ProductIcon";

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
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${props.products.length > 1 ? 2 : 1}, ${
        props.size || 20
      }px)`}
      gap={0.25}
    >
      {props.products.map((p) => (
        <ProductIcon product={p} size={props.size || 20} key={p} />
      ))}
    </Box>
  );
};

export default ProductsGrid;
