import { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

type OptionListSelector = {
  label: string;
  value: string | number;
};

interface SelectorProps {
  disabled?: boolean;
  label: string;
  options: OptionListSelector[];
  setSelected: (value: string) => void;
  selected: string;
  defaultValue?: boolean;
  width?: number | string;
}

export const Selector = ({
  disabled = false,
  label,
  options,
  setSelected,
  selected,
  defaultValue,
  width,
}: SelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  useEffect(() => {
    if (!!options && defaultValue) {
      setSelected(options.at(0)?.value as string);
    }
  }, [options]);

  return (
    <Box mt={3} textAlign="center">
      <FormControl sx={{ width: `${width ? width : "100%"}` }}>
        <InputLabel id="year-tender-label">{label}</InputLabel>
        <Select
          labelId={label}
          id={label}
          value={selected}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
          {options?.map((opt, i) => (
            <MenuItem key={opt.label + i} value={opt.value}>
              <Typography>{opt.label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
