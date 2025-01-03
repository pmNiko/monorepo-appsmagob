import { useEffect } from "react";
import { ErrorMessage, useField } from "formik";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

interface Props {
  label: string;
  name: string;
  isEditing?: boolean;
  [x: string]: any;
}

export const MyCheckbox = ({ label, isEditing, ...props }: Props) => {
  const [field, _meta, helpers] = useField({ ...props, type: "checkbox" });

  const { setValue, setTouched } = helpers;

  useEffect(() => {
    if (isEditing) {
      setValue(false);
      setTouched(false);
    }
  }, [isEditing]);

  return (
    <>
      <FormControlLabel
        {...field}
        {...props}
        control={<Checkbox />}
        label={label}
      />

      <Typography variant="caption" color="red">
        <ErrorMessage name={props.name} component="span" />
      </Typography>
    </>
  );
};
