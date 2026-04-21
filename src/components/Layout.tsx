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
          boxShadow: 1,
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
