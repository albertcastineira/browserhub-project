import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import {
  CURRENT_VERSION_APP,
  CURRENT_VERSION_DATE_RELEASE,
  LOCAL_STORAGE_KEYS,
} from "../utils/constants";
import { UI_LITERALS } from "../i18n/literals";

const FirstTimeDialog: React.FC = () => {
  const { firstTimeDialogOpen, setFirstTimeDialogOpen } =
    useContext(GlobalContext);

  useEffect(() => {
    const currentReleaseSignature = `${CURRENT_VERSION_APP}|${CURRENT_VERSION_DATE_RELEASE}`;
    const storedReleaseSignature = localStorage.getItem(
      LOCAL_STORAGE_KEYS.RELEASE_VERSION,
    );

    // Show welcome when either version or release date has changed.
    if (storedReleaseSignature !== currentReleaseSignature) {
      setFirstTimeDialogOpen(true);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.RELEASE_VERSION,
        currentReleaseSignature,
      );
    }
  }, [setFirstTimeDialogOpen]);

  return (
    <Dialog
      open={firstTimeDialogOpen}
      onClose={() => setFirstTimeDialogOpen(false)}
    >
      <DialogTitle>{UI_LITERALS.firstTime.title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: 1 }}>
          <strong>
            {UI_LITERALS.firstTime.versionPrefix} {CURRENT_VERSION_APP} -{" "}
            {CURRENT_VERSION_DATE_RELEASE}
          </strong>
          <hr />
        </DialogContentText>
        <DialogContentText sx={{ marginBottom: 1 }}>
          {UI_LITERALS.firstTime.description}
          <br />
          {UI_LITERALS.firstTime.themeHint}
        </DialogContentText>
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            padding: 2,
            borderRadius: 1,
            border: 1,
            borderColor: "primary.main",
            bgcolor: "action.hover",
          }}
        >
          <DialogContentText sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {UI_LITERALS.firstTime.patchNotesTitle}
          </DialogContentText>
          <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
            {UI_LITERALS.firstTime.patchChanges.map((change) => (
              <Box component="li" key={change} sx={{ marginBottom: 0.5 }}>
                <DialogContentText>{change}</DialogContentText>
              </Box>
            ))}
          </Box>
        </Box>
        <DialogContentText sx={{ marginY: 3 }}>
          {UI_LITERALS.firstTime.authorPrefix}
          <Link
            sx={{ marginLeft: 1 }}
            href={"https://albertcasti-portfolio.vercel.app/"}
            target="_blank"
            rel="noopener"
          >
            Albert Castiñeira
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => setFirstTimeDialogOpen(false)}>
          {UI_LITERALS.common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstTimeDialog;
