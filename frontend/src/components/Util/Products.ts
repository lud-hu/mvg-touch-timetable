import { Products } from "../Types";

export const getColorForProduct = (
  product: Products,
  lineName: string
): string => {
  if ("BUS" === product || "REGIONAL_BUS" === product)
    return "X30" === lineName ? "#4e7e6c" : "#00586A";
  if ("EXPRESS_BUS" === product) return "#4e7e6c";
  if ("TRAM" === product) return "#D82020";
  if ("UBAHN" === product)
    switch (lineName) {
      case "U1":
      case "U7":
        return "#438136";
      case "U2":
        return "#C40C37";
      case "U3":
        return "#F36E31";
      case "U4":
        return "#0AB38D";
      case "U5":
        return "#B8740E";
      case "U6":
        return "#006CB3";
      case "U8":
        return "#a90c37";
    }
  if ("SBAHN" === product)
    switch (lineName) {
      case "S1":
        return "#16bae7";
      case "S2":
        return "#76b82A";
      case "S3":
        return "#951B81";
      case "S4":
        return "#E30613";
      case "S6":
        return "#00975F";
      case "S7":
        return "#943126";
      case "S8":
        return "#000000";
      case "S20":
        return "#ED6B83";
    }
  if ("BAHN" === product) return "#000";
  if ("FOOTWAY" === product) return "grey";
  return "transparent";
};
