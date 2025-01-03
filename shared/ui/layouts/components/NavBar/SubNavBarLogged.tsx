import { Box, Typography } from "@mui/material";
import { capitalizeWords, useAuthStore } from "@shared/infra";

export const SubNavBarLogged = () => {
  const userSession = useAuthStore((state) => state.user);

  return (
    <Box
      sx={{
        overflowX: "scroll",
        width: "100%",
        scrollbarWidth: "none",
        textAlign: "end",
      }}
      gap={1}
      pb={0.4}
    >
      <Typography noWrap variant="caption" color="black">
        {capitalizeWords(userSession?.denominacion ?? "") + " - "}
      </Typography>
      <Typography noWrap variant="caption" color="black">
        {userSession?.cuitcuil + " - " || ""}
      </Typography>
      <Typography noWrap variant="caption" color="black">
        {userSession?.e_mail || "sin-definir"}
      </Typography>
    </Box>
  );
};
