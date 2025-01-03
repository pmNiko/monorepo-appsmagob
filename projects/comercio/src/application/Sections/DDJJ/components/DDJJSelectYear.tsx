import { Selector } from "@shared/ui";
import { Box, FormControl, Stack } from "@mui/material";
import { useDDJJStore } from "../store";
import { useEffect } from "react";

/* Selector de periodo de declaración jurada */
export const DDJJSelectYear = ({ isLoading }: { isLoading: boolean }) => {
  const year = useDDJJStore((state) => state.year);
  const setYear = useDDJJStore((state) => state.setYear);
  const dateNow = new Date().getFullYear();

  const initDate = 2008;

  const range = [...Array(dateNow - initDate + 1).keys()].map(
    (x) => x + initDate
  );

  const options = range
    .map((ele) => ({ label: ele.toString(), value: ele }))
    .reverse();

  useEffect(() => setYear(options.at(0)!.value), []);

  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <Box width={"90%"}>
        <Stack direction="row">
          <FormControl sx={{ width: "20rem" }}>
            {/* <InputLabel id="demo-simple-select-label">
              Declaración Jurada año {year} (facturación {year - 1})
            </InputLabel> */}

            <Selector
              label={`Declaración Jurada año ${year} (facturación ${year - 1})`}
              options={options}
              selected={year + ""}
              setSelected={(value) => setYear(parseInt(value))}
              disabled={isLoading}
            />

            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label={`Declaración Jurada año ${year} (facturación ${year -
                1}) `}
              disabled={isLoading}
              onChange={(e) => setYear(e.target.value as number)}
            >
              {options.map((opt, i) => (
                <MenuItem key={opt.label + i} value={opt.value}>
                  <Typography alignItems="center" textAlign="center">
                    {opt.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};
