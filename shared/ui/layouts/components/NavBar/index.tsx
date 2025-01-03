import { LogoutTwoTone } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Environments, useAuthStore } from "@shared/infra";
import { useState } from "react";
import sma from "../../../../../assets/sma.png";
import { Menu } from "../Menu";
import { ModalInfo } from "../ModalInfo";
import { SubNavBarLogged } from "./SubNavBarLogged";

export const NavBar = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const isLogged = useAuthStore((state) => state.isLogged);
  const openModal = useAuthStore((state) => state.openModal);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "primary.A100",
      }}
    >
      <Toolbar>
        <Menu />

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 1 }}
          onClick={() =>
            (window.location.href = Environments.Domain + "/inicio/")
          }
        >
          <img src={sma} alt="logo" width={"130px"} />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align="right"
          padding={1}
          marginRight={1}
        >
          <Typography fontSize={16}>
            Municipalidad de San Martín de los Andes
          </Typography>
        </Typography>
      </Toolbar>

      <Box
        sx={{
          backgroundColor: "primary.A200",
          minHeight: "1.8em",
        }}
        display="flex"
        alignItems="center"
        justifyContent="end"
        px={1}
      >
        {isLogged && <SubNavBarLogged />}

        <Box sx={{ minWidth: 178 }}>
          <Button
            size="small"
            sx={{ color: "black", mr: -2 }}
            endIcon={isLogged ? <LogoutTwoTone /> : <AccountCircleIcon />}
            onClick={openModal}
          >
            <Typography
              fontSize="0.97em"
              color="black"
              textTransform="capitalize"
            >
              {isLogged ? "Cerrar Sesión" : "Iniciar Sesión"}
            </Typography>
          </Button>
          <IconButton
            sx={{ ml: 2 }}
            aria-label="delete"
            onClick={() => setOpenInfo(true)}
          >
            <InfoOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      <ModalInfo isOpen={openInfo} close={() => setOpenInfo(false)} />
    </AppBar>
  );
};
