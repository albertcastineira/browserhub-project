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
  Stack,
} from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SummarizeIcon from "@mui/icons-material/Summarize";
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
        {UI_LITERALS.firstTime.title}
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: "20px !important", pb: 1.75 }}>
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
            borderRadius: 2,
            border: 1,
            borderColor: "primary.main",
            bgcolor: "primary.50",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ marginBottom: 0.5 }}
          >
            <NewReleasesIcon fontSize="small" color="primary" />
            <DialogContentText sx={{ fontWeight: "bold" }}>
              {UI_LITERALS.firstTime.patchNotesTitle}
            </DialogContentText>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="flex-start"
            sx={{ marginBottom: 1 }}
          >
            <SummarizeIcon fontSize="small" color="action" />
            <DialogContentText>
              {UI_LITERALS.firstTime.patchSummary}
            </DialogContentText>
          </Stack>
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
      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1, flexWrap: "wrap" }}>
        <Button color="secondary" onClick={() => setFirstTimeDialogOpen(false)}>
          {UI_LITERALS.common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstTimeDialog;
