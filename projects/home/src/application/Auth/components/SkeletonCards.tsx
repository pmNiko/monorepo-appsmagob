import { Box, Card, Grid, Skeleton, Stack } from "@mui/material";

interface SkeletonCardsProps {
  numberCards?: number;
  numberRows?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const getRandomNumber = (): number => Math.floor(Math.random() * (200 - 280 + 1)) + 200;


export const SkeletonCards: React.FC<SkeletonCardsProps> = ({ numberCards = 1, numberRows = 2, ...rest }) => {
  return (
    <>
      {Array.from({ length: numberCards }).map((_, i) => (
        <Grid key={i} container maxWidth={800} minWidth={350} my={3} mx={1}>
          <Grid item xs={12}>
            <Card
              sx={{
                minWidth: 350,
                minHeight: 150,
                borderRadius: 3,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 2,
                ...rest
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
                  <Skeleton variant="rectangular" width={60} height={30} />
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
                  <Stack spacing={2} mt={1}>
                    <Skeleton variant="rectangular" width={250} height={20} />

                    {
                      Array.from({ length: numberRows }).map((_, i) => (
                        <Box key={i} display='flex' gap={2} >
                          <Skeleton variant="rectangular" width={60} height={20} />
                          <Skeleton variant="rectangular" width={getRandomNumber()} height={20} />
                        </Box>
                      ))
                    }
                  </Stack>

                  <Grid container py={1} >
                    <Grid item xs={12} display='flex' gap={2}  >
                      <Skeleton variant="rectangular" width={72} height={26} sx={{ borderRadius: 1.3 }} />
                      <Skeleton variant="rectangular" width={62} height={26} sx={{ borderRadius: 1.3 }} />
                    </Grid>
                  </Grid>

                  <Stack spacing={1} sx={{ borderTop: '1px solid #c1c1c1', pt: 1.5 }} >
                    <Skeleton variant="rectangular" width={250} height={18}
                    />
                    <Skeleton variant="rectangular" width={280} height={18}
                      sx={{ display: i % 2 === 0 ? 'none' : '' }}
                    />
                  </Stack>

                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ))}
    </>
  );
};


{/* <Skeleton variant="rectangular" width={80} height={30} sx={{ mb: 2, borderRadius: 1.5 }} /> */ }