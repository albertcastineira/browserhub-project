import React, { useContext } from "react";
import { Box, Grid2, useTheme } from "@mui/material";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import WebsiteList from "./WebsiteList";
import { GlobalContext } from "../context/GlobalContext";

const Layout: React.FC = () => {
  const theme = useTheme();
  const { setSettingsOpen } = useContext(GlobalContext);

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <Grid2 container>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          [theme.breakpoints.up("md")]: {
            width: "300px",
          },
          boxShadow: 3,
          borderRight: 1,
          borderColor: "divider",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)"
              : "linear-gradient(180deg, #1e1f23 0%, #181a1f 100%)",
        }}
      >
        <Sidebar handleOpenSettings={handleOpenSettings} />
      </Box>
      <Box
        sx={{
          width: "100%",
          [theme.breakpoints.up("md")]: {
            width: "calc(100% - 300px)",
          },
          bgcolor:
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        p={2}
      >
        <SearchBar />
        <WebsiteList />
      </Box>
    </Grid2>
  );
};

export default Layout;
