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
  TextField,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import LanguageIcon from "@mui/icons-material/Language";
import { GlobalContext } from "../context/GlobalContext";
import { Website } from "../domain/interfaces/Website.interface";
import { EMPTY_WEBSITE } from "../context/defaultValues";
import { NEW_WEBSITE_ID } from "../utils/constants";
import { getNextSequentialId } from "../utils/helpers";
import { UI_LITERALS } from "../i18n/literals";

const WebsiteForm: React.FC = () => {
  const {
    websiteFormOpen,
    setWebsiteFormOpen,
    websiteFormMode,
    categories,
    websites,
    createWebsite,
    currentWebsiteId,
    findWebsite,
    updateWebsite,
  } = useContext(GlobalContext);

  const [currentWebsite, setCurrentWebsite] = useState<Website>(EMPTY_WEBSITE);

  useEffect(() => {
    if (currentWebsiteId) {
      const website = findWebsite(currentWebsiteId);
      setCurrentWebsite(website || EMPTY_WEBSITE);
    } else {
      setCurrentWebsite(EMPTY_WEBSITE);
    }
  }, [currentWebsiteId, findWebsite]);

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
    if (currentWebsiteId !== NEW_WEBSITE_ID) {
      updateWebsite(currentWebsiteId, currentWebsite);
    } else {
      createWebsite({
        ...currentWebsite,
        id: getNextSequentialId(websites),
      });
    }

    setWebsiteFormOpen(false);
  };

  return (
    <Dialog
      open={websiteFormOpen}
      onClose={() => setWebsiteFormOpen(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        {UI_LITERALS.website.dialogTitle(websiteFormMode)}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
            sx={{ marginY: 2 }}
          />
          <Select
            id="website-category"
            value={currentWebsite.categoryId}
            onChange={handleChange("categoryId")}
            displayEmpty
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="" disabled>
              {UI_LITERALS.website.selectCategoryPlaceholder}
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => setWebsiteFormOpen(false)}>
          {UI_LITERALS.common.cancel}
        </Button>
        <Button color="primary" variant="contained" onClick={handleSave}>
          {UI_LITERALS.common.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebsiteForm;
