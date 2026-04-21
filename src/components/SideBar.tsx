import React, { useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryList from "./CategoryList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { GlobalContext } from "../context/GlobalContext";
import { CURRENT_VERSION_APP } from "../utils/constants";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { UI_LITERALS } from "../i18n/literals";

interface SidebarProps {
  handleOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleOpenSettings }) => {
  const { setCategoryFormOpen, setCurrentCategoryId, setHelpDialogOpen } =
    useContext(GlobalContext);

  const handleNewCategoryClick = () => {
    setCurrentCategoryId("");
    setCategoryFormOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 40px)",
      }}
      p={2.5}
    >
      <Stack
        alignItems="center"
        direction="row"
        gap={0.5}
        sx={{ marginBottom: 3, display: "flex" }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          {UI_LITERALS.sidebar.appNamePrimary}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ color: "primary.main" }}
        >
          {UI_LITERALS.sidebar.appNameSecondary}
        </Typography>
        <Box
          sx={{
            marginLeft: 1,
            border: 1,
            borderRadius: "999px",
            paddingX: 1,
            fontSize: "0.75em",
            fontWeight: "bold",
            color: "primary.main",
            borderColor: "primary.main",
            backgroundColor: "background.paper",
          }}
        >
          {CURRENT_VERSION_APP}
        </Box>
      </Stack>
      <CategoryList />
      <Stack spacing={1.25}>
        <Button
          onClick={() => handleNewCategoryClick()}
          variant="contained"
          sx={{
            height: "3.4em",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: 2,
          }}
          startIcon={<AddCircleIcon />}
        >
          {UI_LITERALS.sidebar.newCategory}
        </Button>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Stack spacing={1}>
        <Button
          variant="outlined"
          startIcon={<SettingsIcon fontSize="small" />}
          onClick={handleOpenSettings}
          sx={{
            height: "3em",
            borderRadius: 2,
            justifyContent: "flex-start",
            borderColor: "divider",
            borderWidth: 1.5,
            color: "text.primary",
            backgroundColor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              borderColor: "primary.main",
              borderWidth: 1.5,
              backgroundColor: "action.hover",
              boxShadow: 2,
            },
          }}
        >
          {UI_LITERALS.common.settings}
        </Button>
        <Button
          variant="outlined"
          startIcon={<HelpOutlineIcon fontSize="small" />}
          onClick={() => setHelpDialogOpen(true)}
          sx={{
            height: "3em",
            borderRadius: 2,
            justifyContent: "flex-start",
            borderColor: "divider",
            borderWidth: 1.5,
            color: "text.primary",
            backgroundColor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              borderColor: "primary.main",
              borderWidth: 1.5,
              backgroundColor: "action.hover",
              boxShadow: 2,
            },
          }}
        >
          {UI_LITERALS.common.help}
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
