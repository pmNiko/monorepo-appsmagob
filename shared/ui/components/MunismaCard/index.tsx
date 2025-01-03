import { Box, Grid, GridSize, Typography } from "@mui/material";

interface Props {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  minHeight?: string;
  minWidth?: string;
  justifyTarget?: "space-around" | "space-between" | "space-evenly" | "center";
  showImage?: boolean;
  headerTitleComponent?: JSX.Element;
  title?: string;
  children: JSX.Element | JSX.Element[];

  mt?: string | number;
  mb?: string | number;
}

/**
 * - Componente - Tarjeta de renderizado del body
 * - Propiedades por default
 *    - GridZise:
 *      - xs ➡️ 11
 *      - sm ➡️ 8
 *      - md ➡️ 6
 *      - lg ➡️ 4
 *    - showImage: false
 *    - title: ""
 *    - justifyTarget: "space-between"
 */
export const MunismaCard = ({
  xs = 11,
  sm = 8,
  md = 6,
  lg = 4,
  minHeight = "78vh",
  minWidth = "340px",
  showImage = false,
  headerTitleComponent,
  title = "",
  justifyTarget = "space-between",
  children,
  mt = "",
  mb = "",
}: Props) => {
  return (
    <>
      {headerTitleComponent && headerTitleComponent}
      <Grid container display="flex" justifyContent="center" mt={mt} mb={mb}>
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.4)",
              borderRadius: "15px 15px 15px 15px ",
              minHeight,
              minWidth,
              display: "flex",
              flexDirection: "column",
              justifyContent: justifyTarget,
            }}
          >
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                textAlign="center"
                fontWeight="bold"
                pt={4}
                px={4}
                sx={{ display: !title ? "none" : "" }}
              >
                {title}
              </Typography>
              {showImage && (
                <Box textAlign="center" mt={6}>
                  <img
                    src="https://app.sma.gob.ar/imgs/despapelizacion.png"
                    style={{ opacity: "0.5", height: "10em" }}
                  />
                </Box>
              )}
            </Box>

            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
