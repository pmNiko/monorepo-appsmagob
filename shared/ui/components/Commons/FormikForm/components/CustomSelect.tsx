import { ErrorMessage, useField } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  [x: string]: any;
}

export const CustomSelect = ({ label, options, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-label" htmlFor={props.id || props.name}>
          {label}
        </InputLabel>
        <Select
          {...field}
          {...props}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
        >
          {options.map((opt) => (
            <MenuItem key={opt.label} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="caption" color="red">
        <ErrorMessage name={props.name} component="span" />
      </Typography>
    </>
  );
};
