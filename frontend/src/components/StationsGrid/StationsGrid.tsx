import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { StoredStation, Station } from "../Types";
import AddStationDialog from "./AddStationDialog";
import { initialStations, ADD_NEW_TAG, increaseSearchCounts } from "./helper";
import TouchLine from "./TouchLine";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#4562a2",
  color: theme.palette.mode === "dark" ? "#666" : "white",
  ...theme.typography.body2,
  fontSize: 16,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StationsGrid: React.FC = () => {
  const navigate = useNavigate();
  const stationsRefs = useRef<HTMLDivElement[] | null[]>([]);
  const addNewRef = useRef<HTMLDivElement | null>(null);
  const [stations, setStations] = useLocalStorage<StoredStation[]>(
    "STATIONS",
    initialStations
  );
  const [startId, setStartId] = useState<string>();
  const [stopId, setStopId] = useState<string>();
  const [startCoordinates, setStartCoordinates] = useState<[number, number]>();
  const [stopCoordinates, setStopCoordinates] = useState<[number, number]>();
  const [isAddStationDialogOpen, setIsAddStationDialogOpen] = useState(false);

  const resetTouchParams = () => {
    setStartId(undefined);
    setStartCoordinates(undefined);
    setStopId(undefined);
    setStopCoordinates(undefined);
  };

  /**
   * Main effect that reacts to changes to the start and stop variables:
   * - Open dialog of one of them is set to "addNew"
   * - Navigate to route page once both are set
   * - Reset touch path if it was just a click on "Add new"
   */
  useEffect(() => {
    if (startId && stopId) {
      if (startId === ADD_NEW_TAG || stopId === ADD_NEW_TAG) {
        setIsAddStationDialogOpen(true);
      }
      if (
        startId !== stopId &&
        startId !== ADD_NEW_TAG &&
        stopId !== ADD_NEW_TAG
      ) {
        navigate(`/route?start=${startId}&stop=${stopId}`);
      }
      if (startId !== ADD_NEW_TAG && startId === stopId) {
        resetTouchParams();
      }
    }
  }, [startId, stopId, stations]);

  // Prepare ref array
  useEffect(() => {
    stationsRefs.current = stationsRefs.current.slice(0, stations.length + 1);
  }, [stations]);

  /**
   * Updates the coordinates needed for the drawn path.
   * @param x
   * @param y
   */
  const updatePointerCoordinates = (x: number, y: number) => {
    if (!startCoordinates) {
      setStartCoordinates([x, y]);
    } else {
      setStopCoordinates([x, y]);
    }
  };

  /**
   * Searches for the station container where the draw gesture was stopped on
   * and sets the proper id to the stopId state.
   * @param x
   * @param y
   */
  const determineStopFromScreenCoordinates = (x: number, y: number) => {
    let found = false;
    const allRefs = [...stationsRefs.current, addNewRef.current];
    for (let c of allRefs) {
      const rect = c?.getBoundingClientRect();
      if (rect) {
        // check horizontally
        if (rect.left < x && x < rect.right) {
          // check vertically
          if (rect.top < y && y < rect.bottom) {
            // Found!
            if (c?.dataset.id) {
              const newId = c?.dataset.id;
              found = true;
              setStopId(newId);
              // Increase search counts in local storage for the used stations
              if (startId) {
                setStations((stations) =>
                  increaseSearchCounts(stations, [startId, newId])
                );
              }
              break;
            }
          }
        }
      }
    }
    if (!found) {
      resetTouchParams();
    }
  };

  /**
   * Handles the selection of a new station via the "Add new" button:
   * - If it was a single click on "Add new": add to stations list
   * - Otherwise set start or stop accordingly, add to list and increase search counts
   * @param station The new station
   */
  const onStationSelection = (station: Station) => {
    if (startId && stopId) {
      const stationAlreadyExists = stations.find((s) => s.id === station.id);
      if (startId === ADD_NEW_TAG && stopId === ADD_NEW_TAG) {
        // Special case: If just clicked on "Add new station", both start and stop will be "addNew"
        if (!stationAlreadyExists) {
          setStations((stations) => [
            ...stations,
            {
              ...station,
              searchCount: 0,
            },
          ]);
          setStartId(station.id);
          setStopId(station.id);
        } else {
          // Show snackbar here?
          resetTouchParams();
        }
      } else {
        if (stationAlreadyExists) {
          setStations((stations) =>
            increaseSearchCounts(stations, [startId, stopId])
          );
        } else {
          setStations((stations) => [
            ...increaseSearchCounts(stations, [startId, stopId]),
            {
              ...station,
              searchCount: 1,
            },
          ]);
        }
        if (startId === ADD_NEW_TAG) setStartId(station.id);
        if (stopId === ADD_NEW_TAG) setStopId(station.id);
      }
    }
  };

  /**
   * Prepares the gesture handles for the grid items.
   */
  const bind = useGesture({
    // @ts-ignore
    onDrag: (state) => updatePointerCoordinates(...state.xy),
    // onTouchStart?
    // @ts-ignore
    onDragStart: (state) => setStartId(state.args[0]),
    // @ts-ignore
    onDragEnd: (state) => determineStopFromScreenCoordinates(...state.xy),
  });

  return (
    <Box sx={{ width: 1 }}>
      <TouchLine start={startCoordinates} stop={stopCoordinates} />
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={0.25}>
        {stations
          .sort((a, b) => b.searchCount - a.searchCount)
          .map((i, idx) => (
            <Item
              key={i.id}
              // Save id of the station here, so that we can access it while handling the draw gesture end
              data-id={i.id}
              sx={{ padding: 3, touchAction: "none" }}
              {...bind(i.id)}
              ref={(el) => (stationsRefs.current[idx] = el)}
            >
              {i.name}
            </Item>
          ))}
        {/* Separate item for adding a new station */}
        <Item
          data-id={ADD_NEW_TAG}
          sx={{ padding: 3, touchAction: "none" }}
          {...bind(ADD_NEW_TAG)}
          ref={addNewRef}
        >
          + Hinzufügen
        </Item>
      </Box>
      <AddStationDialog
        open={isAddStationDialogOpen}
        setOpen={setIsAddStationDialogOpen}
        onStationSelection={onStationSelection}
        onAbort={() => {
          resetTouchParams();
          setIsAddStationDialogOpen(false);
        }}
      />
    </Box>
  );
};

export default StationsGrid;
