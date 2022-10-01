import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { API_PATH } from "../Constants";
import { useDebounce } from "../hooks/useDebounce";
import { StationDetails } from "./Util/Types";

interface AutocompleteProps {
  onStationsFound: (stations: StationDetails[]) => void;
  onIsLoadingChange?: (isLoading: boolean) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = (
  props: AutocompleteProps
) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(value);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 2) {
      setIsLoading(true);
      fetch(API_PATH + "/autocomplete?name=" + debouncedSearchTerm)
        .then((response) => response.json())
        .then((data) => props.onStationsFound(data))
        .finally(() => setIsLoading(false));
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    props.onIsLoadingChange?.(isLoading);
  }, [isLoading]);

  return (
    <Box>
      <TextField
        id="station-search-input"
        placeholder="Station suchen..."
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          width: "100%",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            padding: 2,
          },
        }}
      />
    </Box>
  );
};

export default Autocomplete;
