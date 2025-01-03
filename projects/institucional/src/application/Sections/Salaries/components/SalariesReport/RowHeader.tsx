import { TableCell, TableHead, TableRow } from "@mui/material";

export const RowHeader = ({ title }: { title: string }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          colSpan={7}
          variant="head"
          sx={{
            fontWeight: "bold",
            fontSize: "0.9em",
            borderColor: "#fff",
          }}
        >
          {title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="left"
          sx={{ fontWeight: "bold", fontSize: "0.8em", borderColor: "#fff" }}
        >
          Tipo Contratación
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontWeight: "bold", fontSize: "0.8em", borderColor: "#fff" }}
        >
          Empleados
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontWeight: "bold",
            fontSize: "0.8em",
            borderColor: "#fff",
            pr: 5,
          }}
        >
          Sueldo Neto
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontWeight: "bold",
            fontSize: "0.8em",
            borderColor: "#fff",
            pr: 5,
          }}
        >
          Remunerativo
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontWeight: "bold",
            fontSize: "0.8em",
            borderColor: "#fff",
            pr: 6,
          }}
        >
          Familiar
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontWeight: "bold",
            fontSize: "0.8em",
            borderColor: "#fff",
            pr: 6,
          }}
        >
          Exento
        </TableCell>
        <TableCell
          align="right"
          sx={{
            fontWeight: "bold",
            fontSize: "0.8em",
            borderColor: "#fff",
            pr: 4,
          }}
        >
          Retención de ley
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
