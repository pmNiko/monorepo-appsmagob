import { Grid, Typography } from "@mui/material";
import meta from "../../../../../package.json";
import { MailTo } from "../MailTo";

export const Footer = () => (
  <Grid
    container
    sx={{ background: "#1f1f1f", minWidth: "350px", minHeight: "30vh" }}
    mt={2}
  >
    <Grid item xs={12} textAlign="center" fontSize={15} color="white" mt={3}>
      <Typography>Municipalidad de San Martín de los Andes</Typography>
    </Grid>
    <Grid item xs={12} textAlign="center" fontSize={13} color="white">
      General Roca y Juan Manuel de Rosas
    </Grid>
    <Grid item xs={12} textAlign="center" fontSize={13} color="white">
      CP Q8370, Neuquén
    </Grid>
    <Grid item xs={12} mb={1} textAlign="center" fontSize={13} color="white">
      0800-345-1975
    </Grid>
    <Grid
      item
      xs={12}
      mx={1}
      mt={2}
      mb={1}
      textAlign="center"
      fontSize={13}
      color="white"
    >
      Central telefónica: (02972) 427315 - 427316 - 428795 - 428796 - 428797 -
      411997
    </Grid>

    <MailTo title="Gobierno: 270 / 271" label="medigital@smandes.gob.ar" />

    <MailTo
      title="Rentas: 223 / 224 / 225"
      label="consultas.rentas@smandes.gob.ar"
    />

    <MailTo title="Recursos humanos: 258 / 259" label=" rrhh@smandes.gob.ar" />

    <Grid item xs={12} py={2} textAlign="center" fontSize={13} color="white">
      versión {meta.version}
    </Grid>
  </Grid>
);
