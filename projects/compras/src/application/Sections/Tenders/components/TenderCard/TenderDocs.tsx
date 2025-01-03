import { useContext } from "react";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useDownload } from "usedownloadmunisma";
import { MyProgressBar, SimpleModal } from "@shared/ui";
import { TendersContext } from "../../context";
import { TenderFileProps } from "../../interfaces";

const ICONS = {
  PDF: <PictureAsPdfOutlinedIcon color="error" />,
  JPG: <ImageOutlinedIcon color="primary" />,
  DOC: <DescriptionOutlinedIcon color="info" />,
  XLS: <BackupTableOutlinedIcon color="success" />,
  ZIP: <FolderZipOutlinedIcon color="secondary" />,
};

/**
 * Componente de documentación descargable de licitaciones
 */
export const TenderDocs = () => {
  const { docs, tenderID } = useContext(TendersContext);
  const handleDownload = useDownload();

  return (
    <Box sx={{ width: "100%" }} mt={4}>
      <Typography textAlign="left" ml={2} mb={1} sx={{ fontWeight: "bold" }}>
        {docs && "Documentación adjunta"}
      </Typography>

      <TableContainer component={Box}>
        <Table aria-label="simple table">
          <TableBody>
            {docs?.map(({ nombrearchivo, tipo }: TenderFileProps) => (
              <TableRow
                key={nombrearchivo}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#6ec5ff",
                  },
                }}
                onClick={() =>
                  handleDownload.tenderFile(parseInt(tenderID), nombrearchivo)
                }
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: "0px", width: "7rem" }}
                >
                  <IconButton aria-label="download file" component="label">
                    {ICONS[tipo]}
                  </IconButton>
                </TableCell>
                <TableCell align="left" sx={{ border: "0px" }}>
                  {nombrearchivo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleModal open={handleDownload.isFetching}>
        <Stack>
          <Typography variant="caption" mb={1}>
            Descargando Licitación
          </Typography>
          <MyProgressBar progress={handleDownload.progress} />
        </Stack>
      </SimpleModal>
    </Box>
  );
};
