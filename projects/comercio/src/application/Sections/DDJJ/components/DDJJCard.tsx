import { useEffect } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { DDJJForm } from "./DDJJForm";
import { DDJJResponse } from "../interfaces";

interface Props {
  ddjj: DDJJResponse;
  expanded: any;
  collapse: () => void;
  changeAccordion: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

/** Representación de cada declaración individual  */
export const DDJJCard = ({
  ddjj,
  expanded,
  collapse,
  changeAccordion,
}: Props) => {
  useEffect(() => collapse(), [ddjj]);

  return (
    <Accordion
      key={ddjj.nomco}
      expanded={expanded === `${ddjj.nomco}`}
      sx={{ boxShadow: `${expanded ? "0px 0px 8px  rgba(0, 0, 0, 0.5)" : ""}` }}
      onChange={changeAccordion(`${ddjj.nomco}`)}
      style={{ marginBottom: 10, marginTop: 10 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box
          width={"100%"}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Stack direction="column" spacing={1}>
              <Typography pt={0.3} fontSize={"0.8rem"} variant="subtitle2">
                {ddjj.nomco}
              </Typography>
              <Typography fontSize={"0.8rem"} variant="subtitle2">
                LIC. Nro.: {ddjj.nrlic}
              </Typography>
            </Stack>
          </Box>

          <Stack direction="column">
            <Stack direction="row">
              {!ddjj.esPrecarga ? (
                <CheckCircleOutlineIcon
                  color="success"
                  sx={{ my: "auto", mr: 0.5 }}
                />
              ) : (
                <CancelOutlinedIcon color="error" sx={{ my: "auto" }} />
              )}
              <Typography
                mx={1}
                pt={0.3}
                fontSize={"0.8rem"}
                variant="subtitle2"
              >
                {!ddjj.esPrecarga
                  ? `DDJJ Nº: ${ddjj.iddecjurada}`
                  : "No declarado"}
              </Typography>
            </Stack>
            <Typography
              mt={1}
              pl={3}
              textAlign="center"
              fontSize={"0.8rem"}
              variant="subtitle2"
            >
              {ddjj.iddecjurada > 0 && `Rectificatoria: ${ddjj.rectificatoria}`}
            </Typography>
          </Stack>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <DDJJForm {...ddjj} />
      </AccordionDetails>
    </Accordion>
  );
};
