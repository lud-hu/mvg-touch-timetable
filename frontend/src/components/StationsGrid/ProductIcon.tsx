import { Avatar, SxProps } from "@mui/material";
import React from "react";
import { Products } from "../Types";

interface ProductIconProps {
  product: Products;
  size?: number;
  sx?: SxProps;
}

const ProductIcon: React.FC<ProductIconProps> = (props: ProductIconProps) => {
  const chooseIcon = (p: Products) => {
    switch (p) {
      case "REGIONAL_BUS":
      case "BUS":
        return "/icons/bus.svg";
      case "EXPRESS_BUS":
        return "/icons/xbus.svg";
      case "SBAHN":
        return "/icons/sbahn.svg";
      case "TRAM":
        return "/icons/tram.svg";
      case "UBAHN":
        return "/icons/ubahn.svg";
      case "BAHN":
        return "/icons/bahn.svg";
      default:
        return "/icons/footway.svg";
    }
  };

  return (
    <Avatar
      key={props.product}
      alt={props.product}
      src={chooseIcon(props.product)}
      sx={{
        width: props.size || 20,
        height: props.size || 20,
        borderRadius: "unset",
        ...props.sx,
      }}
    />
  );
};

export default ProductIcon;
