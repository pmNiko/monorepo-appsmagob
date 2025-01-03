import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ErrorMessage, useField } from "formik";

interface FormatterOptions {
  label: string | number;
  value: string | number;
}

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  options: FormatterOptions[];
  [x: string]: any;
}
export const MySelect = ({ label, options, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <>
      <FormControl fullWidth {...props}>
        <InputLabel
          id="select-label"
          htmlFor={props.id || props.name}
          sx={{ color: "#030303" }}
        >
          {label}
        </InputLabel>
        <Select
          {...field}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
        >
          {options.map((opt, i) => (
            <MenuItem key={opt.label.toString() + i} value={opt.value}>
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
