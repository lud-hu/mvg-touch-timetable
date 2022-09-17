import { StoredStation } from "../Types";

/**
 * Increases the search counts for the given stations by 1.
 * @param stationList
 * @param searchedStationIds
 * @returns
 */
export const increaseSearchCounts = (
  stationList: StoredStation[],
  searchedStationIds: StoredStation["id"][]
): StoredStation[] => {
  return stationList.map((s) => ({
    ...s,
    searchCount: searchedStationIds.includes(s.id)
      ? s.searchCount + 1
      : s.searchCount,
  }));
};

export const ADD_NEW_TAG = "addNew";

export const initialStations: StoredStation[] = [
  {
    name: "Hauptbahnhof",
    id: "de:09162:6",
    searchCount: 0,
  },
];
