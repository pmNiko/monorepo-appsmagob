import { Box, Card, Grid, Typography } from "@mui/material";
import { getIconFromTitle } from "../shared";
import { CustomIcon } from "@shared/ui";

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const DashboardCard = ({ title, children, ...rest }: Props) => {
  return (
    <Grid container maxWidth={800} minWidth={350} my={3} mx={1}>
      <Grid item xs={12}>
        <Card
          sx={{
            minWidth: 350,
            minHeight: 150,
            borderRadius: 3,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 2,
            ...rest,
          }}
        >
          <Grid container>
            <Grid
              item
              container
              xs={12}
              sm={2}
              gap={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              borderBottom={{ xs: 1, sm: 0 }}
              mx={{ xs: 4, sm: 0 }}
              py={{ xs: 1, sm: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: {
                    xs: "row",
                    sm: "column",
                    md: "column",
                  },
                }}
              >
                <Box textAlign="center">
                  <CustomIcon
                    iconName={getIconFromTitle(title)!}
                    iconFontSize={28}
                  />
                </Box>
                <Box margin="auto">
                  <Typography variant="h6" fontWeight="bold">
                    {title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={10}
              gap={1}
              direction="column"
              justifyContent="center"
              borderLeft={{ sm: 1 }}
              pr={2}
              pl={{ xs: 4, sm: 3 }}
              py={{ xs: 2, sm: 0 }}
            >
              {children}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
