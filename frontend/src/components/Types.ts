export interface Station {
  name: string;
  id: string;
}

export interface StoredStation extends Station {
  searchCount: number;
}

// API TYPES:

// export interface Lines {
//   bus: any[];
//   nachtbus: any[];
//   nachttram: any[];
//   otherlines: any[];
//   sbahn: any[];
//   tram: any[];
//   ubahn: any[];
// }

// export interface From {
//   divaId: number;
//   efaLat: number;
//   efaLon: number;
//   hasLiveData: boolean;
//   hasZoomData: boolean;
//   id: string;
//   latitude: number;
//   lines: Lines;
//   link: string;
//   longitude: number;
//   name: string;
//   occupancy: string;
//   place: string;
//   products: Products[];
//   tariffZones: string;
//   type: string;
// }

// export interface InterchangePath {
//   latitude: number;
//   longitude: number;
//   type: string;
// }

// export interface Path {
//   latitude: number;
//   longitude: number;
//   type: string;
// }

// export interface PathDescription {
//   from: number;
//   level: number;
//   to: number;
// }

// export interface Location {
// divaId: number;
// efaLat: number;
// efaLon: number;
// hasLiveData: boolean;
// hasZoomData: boolean;
// id: string;
// latitude: number;
// lines: Lines;
// longitude: number;
// name: string;
// occupancy: string;
// place: string;
// products: Products[];
// tariffZones: string;
// type: string;
// }

// export interface Stop {
// arrDelay: number;
// cancelled: boolean;
// delay: number;
// location: Location;
// time: any;
// }

// export interface To {
// divaId: number;
// efaLat: number;
// efaLon: number;
// hasLiveData: boolean;
// hasZoomData: boolean;
// id: string;
// latitude: number;
// lines: Lines;
// link: string;
// longitude: number;
// name: string;
// occupancy: string;
// place: string;
// products: Products[];
// tariffZones: string;
// type: string;
// }

export interface ConnectionPartList {
  arrDelay: number;
  // arrival: any;
  // cancelled: boolean;
  // arrivalPlatform: string;
  // arrivalStopPositionNumber: number;
  // cancelled: boolean;
  connectionPartType: string;
  delay: number;
  // departure: any;
  // departureId: string;
  // departurePlatform: string;
  // departureStopPositionNumber: number;
  destination: string;
  // from: From;
  // fromId: string;
  // interchangePath: InterchangePath[];
  label: string;
  // lineDirection: string;
  // network: string;
  // noChangingRequired: boolean;
  // occupancy: string;
  // path: Path[];
  // pathDescription: PathDescription[];
  product: string;
  // serverId: string;
  // sev: boolean;
  // stops: Stop[];
  // to: To;
  // zoomNoticeArrival: boolean;
  // zoomNoticeArrivalElevator: boolean;
  // zoomNoticeArrivalEscalator: boolean;
  // zoomNoticeDeparture: boolean;
  // zoomNoticeDepartureElevator: boolean;
  // zoomNoticeDepartureEscalator: boolean;
}

export interface StationDetails {
  // divaId: number;
  // efaLat: number;
  // efaLon: number;
  // hasLiveData: boolean;
  // hasZoomData: boolean;
  id: string;
  // latitude: number;
  // lines: Lines;
  // link: string;
  // longitude: number;
  name: string;
  // occupancy: string;
  place: string;
  products: Products[];
  // tariffZones: string;
  // type: string;
}

export interface Connection {
  arrival: number;
  // arrival_datetime: string;
  connectionPartList: ConnectionPartList[];
  departure: number;
  // departure_datetime: string;
  // efaTicketIds: string[];
  from: StationDetails;
  // oldTarif: boolean;
  // ringFrom: number;
  // ringTo: number;
  // serverId: number;
  to: StationDetails;
  // zoomNoticeFrom: boolean;
  // zoomNoticeFromElevator: boolean;
  // zoomNoticeFromEscalator: boolean;
  // zoomNoticeTo: boolean;
  // zoomNoticeToElevator: boolean;
  // zoomNoticeToEscalator: boolean;
}

export type Products = "SBAHN" | "UBAHN" | "TRAM" | "BUS" | "BAHN";
