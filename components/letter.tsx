import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import React from "react";

export const Letter: React.FC = () => {
  const [value, setValue] = React.useState("0");
  
  return (
    <Box width={100}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Result</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Result"
            onChange={(event) => setValue(event.target.value)}
          >
            <MenuItem value={'0'}>Invalid</MenuItem>
            <MenuItem value={'1'}>Orange</MenuItem>
            <MenuItem value={'2'}>Green</MenuItem>
        </Select>
      </FormControl>
      <TextField />
    </Box>
  );
};
