import { TextField, Typography } from "@mui/material";
import { ErrorMessage, useField } from "formik";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  [x: string]: any;
}

export const MyTextInput = ({ label, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <>
      <TextField
        label={label}
        {...props}
        {...field}
        InputLabelProps={{
          sx: {
            color: "rgb(156, 156, 156)",
            fontSize: "0.8em",
          },
        }}
      />
      <Typography variant="caption" color="red">
        <ErrorMessage name={props.name} component="span" />
      </Typography>
    </>
  );
};
