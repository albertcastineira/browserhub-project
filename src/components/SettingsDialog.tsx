import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { defaultThemePrimaryColors } from "../theme/theme";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PaletteIcon from "@mui/icons-material/Palette";
import StorageIcon from "@mui/icons-material/Storage";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SettingsIcon from "@mui/icons-material/Settings";
import { GlobalContext } from "../context/GlobalContext";
import { downloadStoredBrowserData } from "../utils/helpers";
import { LOCAL_STORAGE_KEYS } from "../utils/constants";
import { DEFAULT_CATEGORIES, DEFAULT_WEBSITES } from "../context/defaultValues";
import { UI_LITERALS } from "../i18n/literals";

interface SettingsDialogProps {
  onChangePrimaryColor: (newColor: string) => void;
  mode: string | undefined;
  onChangeThemeMode: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  onChangePrimaryColor,
  onChangeThemeMode,
  mode,
}) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(mode === "dark");
  const { settingsOpen, setSettingsOpen, setCategories, setWebsites } =
    useContext(GlobalContext);

  useEffect(() => {
    setIsDarkModeEnabled(mode === "dark");
  }, [mode]);

  const handleClose = () => {
    setSettingsOpen(false);
  };

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      try {
        const fileContent = await file.text();
        const parsedData = JSON.parse(fileContent) as {
          categories?: unknown;
          websites?: unknown;
        };

        if (
          Array.isArray(parsedData.categories) &&
          Array.isArray(parsedData.websites)
        ) {
          setCategories(parsedData.categories);
          setWebsites(parsedData.websites);
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.STORED_DATA,
            JSON.stringify(parsedData),
          );
        } else {
          console.error("Invalid data format in local storage.");
        }
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    } else {
      console.warn("No file selected.");
    }
  };

  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      void handleFileChange(event);
    };
    input.click();
  };

  const handleResetData = () => {
    setCategories(DEFAULT_CATEGORIES);
    setWebsites(DEFAULT_WEBSITES);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.STORED_DATA,
      JSON.stringify({
        categories: DEFAULT_CATEGORIES,
        websites: DEFAULT_WEBSITES,
      }),
    );
  };

  return (
    <Dialog
      open={settingsOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          backgroundColor: "background.default",
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{ borderBottom: 1, borderColor: "divider", px: 3, py: 2.25 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <SettingsIcon fontSize="small" />
          <span>{UI_LITERALS.settings.title}</span>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: "20px !important", pb: 1.75 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <PaletteIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.settings.themeSectionTitle}
          </Typography>
        </Stack>
        <DialogContentText sx={{ marginBottom: 1 }}>
          {UI_LITERALS.settings.toggleDarkMode}
        </DialogContentText>
        <Switch
          checked={isDarkModeEnabled}
          onChange={() => {
            onChangeThemeMode();
            setIsDarkModeEnabled(!isDarkModeEnabled);
          }}
        />

        <DialogContentText sx={{ marginTop: 3 }}>
          {UI_LITERALS.settings.selectTheme}
        </DialogContentText>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {defaultThemePrimaryColors.map((color) => (
            <Box key={color.color} sx={{ textAlign: "center" }}>
              <Button
                key={color.name}
                onClick={() => onChangePrimaryColor(color.color)}
                sx={{
                  backgroundColor: color.color,
                  color: "white",
                  px: 2,
                  py: 0.5,
                  minWidth: 72,
                  borderRadius: "999px",
                }}
              >
                {color.name}
              </Button>
            </Box>
          ))}
        </Box>

        <Divider sx={{ marginTop: 2.5 }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
        >
          <StorageIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.settings.manageDataSectionTitle}
          </Typography>
        </Stack>

        <Box>
          <Button
            startIcon={<FileUploadIcon />}
            variant="contained"
            onClick={handleImportClick}
            sx={{ marginRight: 2 }}
          >
            {UI_LITERALS.settings.import}
          </Button>
          <Button
            onClick={() => downloadStoredBrowserData()}
            startIcon={<DownloadIcon />}
            variant="outlined"
          >
            {UI_LITERALS.settings.export}
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: 3,
            borderRadius: 2,
            p: 1.75,
            border: 1,
            borderColor: "error.main",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(211, 47, 47, 0.16)"
                : "rgba(211, 47, 47, 0.08)",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <WarningAmberIcon fontSize="small" color="error" />
            <Typography variant="subtitle1" color="error" fontWeight={700}>
              {UI_LITERALS.settings.dangerZone}
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            onClick={() => handleResetData()}
            sx={{ marginTop: 2 }}
            color="secondary"
          >
            {UI_LITERALS.settings.resetData}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1, flexWrap: "wrap" }}>
        <Button color="secondary" onClick={handleClose}>
          {UI_LITERALS.common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
