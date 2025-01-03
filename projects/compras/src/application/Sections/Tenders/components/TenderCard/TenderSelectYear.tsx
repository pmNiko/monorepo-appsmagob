import { useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { TendersContext } from "../../context";

/**
 * - Componente - selector de período de licitación
 */
export const TenderSelectYear = () => {
  const { years, year, setYear, setTenderByQS, disabled } = useContext(
    TendersContext
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="year-tender-label">Año</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={year}
        label="Período"
        onChange={(event: SelectChangeEvent) => {
          setYear(event.target.value as string);
          setTenderByQS("");
        }}
        disabled={disabled}
      >
        {years.map((opt: any, i: number) => (
          <MenuItem key={i} value={opt}>
            <Typography
              sx={{
                textAlign: "start",
              }}
            >
              {opt}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
