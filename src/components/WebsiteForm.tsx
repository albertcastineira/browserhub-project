import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import LanguageIcon from "@mui/icons-material/Language";
import { GlobalContext } from "../context/GlobalContext";
import { Website } from "../domain/interfaces/Website.interface";
import { EMPTY_WEBSITE } from "../context/defaultValues";
import { ALL_CATEGORY_ID, NEW_WEBSITE_ID } from "../utils/constants";
import { UI_LITERALS } from "../i18n/literals";

const WebsiteForm: React.FC = () => {
  const {
    websiteFormOpen,
    setWebsiteFormOpen,
    websiteFormMode,
    categories,
    createWebsite,
    currentWebsiteId,
    findWebsite,
    updateWebsite,
  } = useContext(GlobalContext);

  const [currentWebsite, setCurrentWebsite] = useState<Website>(EMPTY_WEBSITE);
  const [isSaving, setIsSaving] = useState(false);

  const selectableCategories = categories.filter(
    (category) => category.id !== ALL_CATEGORY_ID,
  );

  useEffect(() => {
    if (currentWebsiteId) {
      const website = findWebsite(currentWebsiteId);
      setCurrentWebsite(website || EMPTY_WEBSITE);
    } else {
      setCurrentWebsite(EMPTY_WEBSITE);
    }
  }, [currentWebsiteId, findWebsite]);

  useEffect(() => {
    if (!websiteFormOpen) {
      setIsSaving(false);
    }
  }, [websiteFormOpen]);

  const handleChange =
    (field: keyof Website) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>,
    ) => {
      const value = event.target.value;
      setCurrentWebsite((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSave = () => {
    if (isSaving) {
      return;
    }

    const normalizedWebsite: Website = {
      ...currentWebsite,
      name: currentWebsite.name.trim(),
      url: currentWebsite.url.trim(),
      categoryId:
        currentWebsite.categoryId || selectableCategories[0]?.id || "",
    };

    if (!normalizedWebsite.name || !normalizedWebsite.url) {
      return;
    }

    setIsSaving(true);

    if (currentWebsiteId !== NEW_WEBSITE_ID) {
      updateWebsite(currentWebsiteId, normalizedWebsite);
    } else {
      createWebsite(normalizedWebsite);
    }

    setWebsiteFormOpen(false);
  };

  return (
    <Dialog
      open={websiteFormOpen}
      onClose={() => setWebsiteFormOpen(false)}
      maxWidth="xs"
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
        {UI_LITERALS.website.dialogTitle(websiteFormMode)}
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: "20px !important", pb: 1.75 }}>
        <FormControl fullWidth>
          <Stack spacing={2}>
            <TextField
              id="input-website-name"
              placeholder={UI_LITERALS.website.placeholderName}
              value={currentWebsite.name}
              onChange={handleChange("name")}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id="input-website-url"
              placeholder={UI_LITERALS.website.placeholderUrl}
              value={currentWebsite.url}
              onChange={handleChange("url")}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Select
              id="website-category"
              value={currentWebsite.categoryId}
              onChange={handleChange("categoryId")}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                {UI_LITERALS.website.selectCategoryPlaceholder}
              </MenuItem>
              {selectableCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1, flexWrap: "wrap" }}>
        <Button color="secondary" onClick={() => setWebsiteFormOpen(false)}>
          {UI_LITERALS.common.cancel}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSave}
          disabled={isSaving}
        >
          {UI_LITERALS.common.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebsiteForm;
