import { CardContent, Stack, Typography } from "@mui/material";
import { AuthorityRoot } from "./AuthorityRoot";
import { Authority } from "../../interfaces";

/**
 * Este muestra la información de nodo.
 * si existe un nodo anidado invoca al componente padre.
 */
export const AuthorityChildren = ({
  idsector,
  sector,
  responsable,
  sectortipo,
  telefono,
  children,
}: Authority) => {
  return (
    <CardContent key={idsector + responsable} sx={{ marginBottom: "-20px" }}>
      <Stack direction="column">
        <Typography
          variant={"subtitle2"}
          fontSize={"0.8em"}
          sx={{ fontWeight: "bold", color: "GrayText", marginBottom: "-7px" }}
          align="left"
        >
          {sectortipo}
        </Typography>
        <Typography
          variant={"subtitle2"}
          fontSize={"0.9em"}
          sx={{ fontWeight: "bold", marginBottom: "-5px" }}
          align="left"
        >
          {sector}
        </Typography>
        <Typography
          variant="subtitle2"
          fontSize={"0.8em"}
          align="left"
          marginBottom="-5px"
        >
          {responsable}
        </Typography>
        <Typography
          variant="caption"
          fontSize={"0.8em"}
          color="GrayText"
          align="left"
        >
          {telefono}
        </Typography>
      </Stack>
      {children!.length > 0 && <AuthorityRoot authorities={children} />}
    </CardContent>
  );
};
