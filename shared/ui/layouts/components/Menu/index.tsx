import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import { useQueryState } from "usequerymunisma";
import { LoaderAsync } from "../../../components";
import { MenuSkeleton } from "./MenuSkeleton";
import { OptionsList } from "./OptionsList";
import { ItemSection } from "./interfaces";

const drawerWidth = 300;

const FN_SGD_MENU = {
  Get_Options: "fnappgetmenu",
} as const;

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isFetching, data: options } = useQueryState<ItemSection[]>(
    FN_SGD_MENU.Get_Options,
    {
      auto: true,
    }
  );

  return (
    <Box component={"nav"} sx={{ flexShrink: { sm: 0 } }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isOpen ? drawerWidth : 0,
          },
          "& .MuiToolbar-root": {
            backgroundColor: "#2ea3f2",
            color: "white",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="logo"
            onClick={() => setIsOpen(false)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Toolbar>

        <LoaderAsync isLoading={isFetching} fallback={<MenuSkeleton />}>
          <OptionsList options={options!} />
        </LoaderAsync>
      </Drawer>
    </Box>
  );
};
