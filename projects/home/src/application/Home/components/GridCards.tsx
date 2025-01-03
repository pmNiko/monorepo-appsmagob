import { Box, Grid, Typography } from "@mui/material";
import { ItemsGridCards } from "@shared/ui/layouts/components/Menu/interfaces";
import { CardItem } from "./CardItem";

export const GridCards = ({ items }: { items: ItemsGridCards[] }) => {
  return (
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
            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: 1,
                fontWeight: "bold",
                textAlign: "left",
                padding: "0 5px 0px ",
              }}
            >
              {group.sector}
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {group.items.map((item, idx) => (
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
                  <CardItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
