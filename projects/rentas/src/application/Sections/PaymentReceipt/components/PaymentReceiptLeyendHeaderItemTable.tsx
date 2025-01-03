import moment from "moment";
import { Typography } from "@mui/material";

export const PaymentReceiptLeyendHeaderItemTable = () => {
  return (
    <Typography fontSize={12} fontStyle="italic">
      Actualizado al {moment(new Date()).format("DD/MM/YYYY")}
    </Typography>
  );
};
