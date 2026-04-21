import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { GlobalContext } from "../context/GlobalContext";
import { DialogContentText } from "@mui/material";
import { UI_LITERALS } from "../i18n/literals";

const HelpDialog: React.FC = () => {
  const { helpDialogOpen, setHelpDialogOpen } = useContext(GlobalContext);

  return (
    <Dialog
      open={helpDialogOpen}
      onClose={() => setHelpDialogOpen(false)}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>{UI_LITERALS.help.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h3>{UI_LITERALS.help.sections.searchbarTitle}</h3>
        </DialogContentText>
        <DialogContentText>
          {UI_LITERALS.help.sections.searchbarText}
        </DialogContentText>

        <DialogContentText>
          <h3>{UI_LITERALS.help.sections.categoriesTitle}</h3>
        </DialogContentText>
        <DialogContentText>
          {UI_LITERALS.help.sections.categoriesText}
        </DialogContentText>

        <DialogContentText>
          <h3>{UI_LITERALS.help.sections.websitesTitle}</h3>
        </DialogContentText>
        <DialogContentText>
          {UI_LITERALS.help.sections.websitesText}
        </DialogContentText>

        <DialogContentText>
          <h3>{UI_LITERALS.help.sections.themeTitle}</h3>
        </DialogContentText>
        <DialogContentText>
          {UI_LITERALS.help.sections.themeText}
        </DialogContentText>

        <DialogContentText>
          <h3>{UI_LITERALS.help.sections.persistenceTitle}</h3>
        </DialogContentText>
        <DialogContentText>
          {UI_LITERALS.help.sections.persistenceText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setHelpDialogOpen(false)} color="secondary">
          {UI_LITERALS.common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
