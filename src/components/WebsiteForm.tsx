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

  useEffect(() => {
    if (currentWebsiteId) {
      const website = findWebsite(currentWebsiteId);
      setCurrentWebsite(website || EMPTY_WEBSITE);
    } else {
      setCurrentWebsite(EMPTY_WEBSITE);
    }
  }, [currentWebsiteId, findWebsite]);

  const handleChange = (field: keyof Website) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    setCurrentWebsite((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (currentWebsiteId !== "0") {
      updateWebsite(currentWebsiteId, currentWebsite);
    } else {
      createWebsite(currentWebsite);
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
      <DialogTitle>{websiteFormMode} Website</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="input-website-name"
            placeholder="My Website"
            value={currentWebsite.name}
            onChange={handleChange("name")}
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
            placeholder="https://my-website.url.com/"
            value={currentWebsite.url}
            onChange={handleChange("url")}
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
              Select a Category
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
        <Button
          color="secondary"
          onClick={() => setWebsiteFormOpen(false)}
        >
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebsiteForm;
