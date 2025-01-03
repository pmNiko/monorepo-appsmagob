import { useContext, useEffect, useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {
  Box,
  Button,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { TendersContext } from "../../context";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}));

/**
 * - Componente para copiar un acceso directo a la licitación
 */
export const TenderCopyLink = ({
  idTenderSelected,
}: {
  idTenderSelected: string;
}) => {
  const {
    details: { numero },
    disabled: interactionDisabled,
  } = useContext(TendersContext);
  const [copied, setCopied] = useState(false);

  // !Muchas de las funcionalidades de la API web requieren SSL
  const copyLink = () => {
    setCopied(true);
    const uri = window.location.href;
    const link = uri.replace(/\?id=\w+/, "");
    const linkToClipboard = `${link}?id=${idTenderSelected}`;

    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(linkToClipboard);
    } else {
      console.error(
        `El sitio no cuenta con SSL válido, copie el link ${linkToClipboard}`
      );
    }
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  return (
    <Box ml={1} mb={2} textAlign="start">
      {copied ? (
        <LightTooltip title="copiado">
          <Button
            variant="text"
            color="success"
            endIcon={<CheckOutlinedIcon />}
          >
            <Typography fontSize={12}>Link copiado</Typography>
          </Button>
        </LightTooltip>
      ) : (
        <Button
          variant="text"
          color="primary"
          onClick={copyLink}
          startIcon={<ContentCopyOutlinedIcon />}
          disabled={interactionDisabled}
        >
          <Typography fontSize={12}>
            Copiar accesso directo licitacion {numero}
          </Typography>
        </Button>
      )}
    </Box>
  );
};
