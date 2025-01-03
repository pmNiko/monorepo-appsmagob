import { useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { LoaderAsync } from "@shared/ui";
import { TendersContext } from "../../context";
import { TenderTitlesForSelect } from "../../interfaces";

/**
 * - Componente - renderizado del selector de titulos de licitación
 */
export const TenderSelectTitle = () => {
  const {
    selectsAreReady,
    titles,
    tenderID,
    setTenderID,
    disabled,
  } = useContext(TendersContext);

  return (
    <LoaderAsync isLoading={!selectsAreReady}>
      <FormControl fullWidth>
        <InputLabel id="tender-select-label">Licitación</InputLabel>
        <Select
          labelId="tender-select-label"
          id="tender-select"
          value={tenderID}
          label="Licitación"
          onChange={(event: SelectChangeEvent) =>
            setTenderID(event.target.value)
          }
          disabled={disabled}
        >
          {titles.map((opt: TenderTitlesForSelect, i: number) => (
            <MenuItem key={i} value={opt.idlicitacion}>
              <Typography
                sx={{
                  overflow: "hidden",
                  textAlign: "start",
                  textOverflow: "ellipsis",
                  width: "98%",
                }}
              >
                {opt.licitacionnombre}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </LoaderAsync>
  );
};
