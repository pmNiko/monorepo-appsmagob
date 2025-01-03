import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FormControlLabel, Grid, IconButton } from "@mui/material";

interface Props {
  title: string;
  label: string;
}

export const MailTo = ({ title, label }: Props) => {
  return (
    <Grid item xs={12} textAlign="center" fontSize={13} color="white">
      {title}
      <FormControlLabel
        style={{ marginLeft: 4 }}
        control={
          <a target="_top" rel="noopener noreferrer" href={`mailto:${label}`}>
            <IconButton color="primary">
              <MailOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </a>
        }
        label={label}
        labelPlacement="end"
        sx={{ color: "#1976d2", marginRight: -0.5 }}
      />
    </Grid>
  );
};
