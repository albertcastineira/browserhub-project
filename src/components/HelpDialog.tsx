import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { GlobalContext } from "../context/GlobalContext";
import { Stack, Typography, DialogContentText } from "@mui/material";
import { UI_LITERALS } from "../i18n/literals";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import StorageIcon from "@mui/icons-material/Storage";

const HelpDialog: React.FC = () => {
  const { helpDialogOpen, setHelpDialogOpen } = useContext(GlobalContext);

  return (
    <Dialog
      open={helpDialogOpen}
      onClose={() => setHelpDialogOpen(false)}
      maxWidth="md"
      fullWidth={true}
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
          <HelpOutlineIcon fontSize="small" />
          <span>{UI_LITERALS.help.title}</span>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: "20px !important", pb: 1.75 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <SearchIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.help.sections.searchbarTitle}
          </Typography>
        </Stack>
        <DialogContentText>
          {UI_LITERALS.help.sections.searchbarText}
        </DialogContentText>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2, mb: 0.5 }}
        >
          <CategoryIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.help.sections.categoriesTitle}
          </Typography>
        </Stack>
        <DialogContentText>
          {UI_LITERALS.help.sections.categoriesText}
        </DialogContentText>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2, mb: 0.5 }}
        >
          <LanguageIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.help.sections.websitesTitle}
          </Typography>
        </Stack>
        <DialogContentText>
          {UI_LITERALS.help.sections.websitesText}
        </DialogContentText>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2, mb: 0.5 }}
        >
          <PaletteIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.help.sections.themeTitle}
          </Typography>
        </Stack>
        <DialogContentText>
          {UI_LITERALS.help.sections.themeText}
        </DialogContentText>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2, mb: 0.5 }}
        >
          <StorageIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight={700}>
            {UI_LITERALS.help.sections.persistenceTitle}
          </Typography>
        </Stack>
        <DialogContentText>
          {UI_LITERALS.help.sections.persistenceText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1, flexWrap: "wrap" }}>
        <Button onClick={() => setHelpDialogOpen(false)} color="secondary">
          {UI_LITERALS.common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
