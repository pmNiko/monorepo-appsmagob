import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import { Box, Button, Typography } from "@mui/material";
import { TendersContext } from "../../context";
import { TenderCopyLink } from "./TenderCopyLink";

/**
 * - Componente para el renderizado condicional del link de licitación
 */
export const TenderLink = () => {
  const navigate = useNavigate();
  const { renderLink, tenderID, ctxReset } = useContext(TendersContext);

  const redirectRoot = () => {
    ctxReset();
    navigate("/");
  };

  return (
    <>
      {renderLink ? (
        <Box ml={1} mb={2} textAlign="start">
          <Button
            variant="text"
            color="primary"
            startIcon={<DiscountOutlinedIcon />}
            onClick={redirectRoot}
          >
            <Typography fontSize={12}>Ver todas</Typography>
          </Button>
        </Box>
      ) : (
        <TenderCopyLink idTenderSelected={tenderID} />
      )}
    </>
  );
};
