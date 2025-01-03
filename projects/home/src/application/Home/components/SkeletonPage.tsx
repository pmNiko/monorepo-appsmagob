import { Box, Grid, Skeleton } from "@mui/material";

const items = [
  { sector: "", items: [1, 2] },
  { sector: "", items: [1, 2, 3] },
  { sector: "", items: [1, 2, 3, 4, 5] },
  { sector: "", items: [1, 2] },
  { sector: "", items: [1] },
];

export const SkeletonPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={1}
      p={0}
    >
      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          padding: 2,
        }}
      >
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={295}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((_, index) => (
                <Grid item xs={6} key={index}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={140}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          margin: "10px auto",
          padding: 2,
        }}
      >
        <Grid container spacing={6}>
          {items.map((group, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton
                variant="rectangular"
                width={150}
                height={30}
                sx={{ mb: 2 }}
              />
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {group.items.map((_, idx) => (
                  <Grid
                    item
                    key={idx}
                    sx={{
                      flex: "0 0 196px",
                      "@media (max-width:1200px)": {
                        flex: "0 0 196px",
                      },
                      "@media (max-width:960px)": {
                        flex: "0 0 25%",
                        maxWidth: "25%",
                      },
                      "@media (max-width:600px)": {
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      },
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={140}
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};
