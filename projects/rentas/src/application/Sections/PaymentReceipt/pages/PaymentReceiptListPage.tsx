import { InfoModalResponse, MunismaCard, Selector } from "@shared/ui";
import { Box, Grid, Typography } from "@mui/material";
import {
  PaymentReceiptActions,
  PaymentReceiptLeyendFooterItemTable,
  PaymentReceiptLeyendHeaderItemTable,
  PaymentReceiptTable,
} from "../components";
import { useFinderPaymentReceipt } from "../hooks";

const PaymentReceiptListPage = () => {
  const handleFinder = useFinderPaymentReceipt();

  return (
    <MunismaCard sm={11} md={10} lg={6} mb={5}>
      <Grid
        container
        sx={{
          backgroundColor: "#2ea3f2",
          borderRadius: "15px 15px 0px 0px",
          color: "white",
          height: "50px",
          marginBottom: 2,
        }}
      >
        <Grid item xs={12} md={6}>
          {handleFinder?.cuitcuil! && (
            <Typography fontSize={14} px={3} py={2}>
              Comprobantes de pago por CUIT: {handleFinder?.cuitcuil!}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Box mr={2} mt={1} display="flex" justifyContent="flex-end">
        <PaymentReceiptLeyendHeaderItemTable />
      </Box>

      <Grid container spacing={2} px={2} mt={1} mb={3}>
        <Grid item xs={12} sm={9}>
          <Selector
            label="Tributo"
            options={handleFinder.taxes!}
            setSelected={handleFinder.setTaxSelect}
            selected={handleFinder.tax}
            defaultValue
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Selector
            label="Periodo"
            options={handleFinder.periods}
            setSelected={handleFinder.setPeriodSelect}
            disabled={handleFinder.disabledPeriodSelect}
            selected={handleFinder.period}
            defaultValue
          />
        </Grid>
      </Grid>

      <PaymentReceiptTable
        isLoading={handleFinder.isLoading}
        paymentReceipts={handleFinder.paymentReceipts}
        setSelection={handleFinder.setSelection}
        selectionExists={handleFinder.selectionExists}
      />

      <PaymentReceiptActions
        selectedItems={handleFinder.selectedItems}
        resetSelection={handleFinder.resetSelection}
      />

      <PaymentReceiptLeyendFooterItemTable />

      <InfoModalResponse notify={handleFinder.notify}>
        <>
          <Typography variant="subtitle2">
            No se registran comprobantes de pago con los parámetros ingresados{" "}
          </Typography>
        </>
      </InfoModalResponse>
    </MunismaCard>
  );
};

export default PaymentReceiptListPage;
