import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getColorForProduct } from "../../Util/ProductsHelper";
import { Products } from "../../Util/Types";

import ProductIcon from "./ProductIcon";

interface ProductBadgeProps {
  product: Products;
  lineName: string;
}

const ProductBadge: React.FC<ProductBadgeProps> = (
  props: ProductBadgeProps
) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        height: "20px",
      }}
    >
      <ProductIcon
        product={props.product}
        sx={{ position: props.lineName !== "" ? "absolute" : "unset" }}
      />
      {props.lineName !== "" && (
        <Typography
          variant="body2"
          sx={{
            background:
              props.product === "FOOTWAY"
                ? "transparent"
                : getColorForProduct(props.product, props.lineName),
            color: "white",
            pr: 1,
            marginLeft: "10px",
            paddingLeft: "17px",
          }}
        >
          {props.lineName}
        </Typography>
      )}
    </Box>
  );
};

export default ProductBadge;
