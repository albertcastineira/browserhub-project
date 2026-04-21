import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import { GlobalContext } from "../context/GlobalContext";
import { EMPTY_CATEGORY } from "../context/defaultValues";
import { Category } from "../domain/interfaces/Category.interface";
import { getNextSequentialId } from "../utils/helpers";
import { UI_LITERALS } from "../i18n/literals";

const CategoryForm: React.FC = () => {
  const {
    currentCategoryId,
    findCategory,
    createCategory,
    updateCategory,
    categories,
    categoryFormOpen,
    setCategoryFormOpen,
    categoryFormMode,
  } = useContext(GlobalContext);

  const [currentCategory, setCurrentCategory] =
    useState<Category>(EMPTY_CATEGORY);

  useEffect(() => {
    if (currentCategoryId) {
      const category = findCategory(currentCategoryId);
      setCurrentCategory(category || EMPTY_CATEGORY);
    } else {
      setCurrentCategory(EMPTY_CATEGORY);
    }
  }, [currentCategoryId, findCategory]);

  const handleChange =
    (field: keyof Category) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>,
    ) => {
      const value = event.target.value;
      setCurrentCategory((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSave = () => {
    const updatedCategory = {
      ...currentCategory,
      name: currentCategory.name.trim(),
    };

    if (updatedCategory.id) {
      updateCategory(updatedCategory.id, updatedCategory);
    } else {
      updatedCategory.id = getNextSequentialId(categories);
      createCategory(updatedCategory);
    }

    setCategoryFormOpen(false);
  };

  return (
    <Dialog
      open={categoryFormOpen}
      onClose={() => setCategoryFormOpen(false)}
      maxWidth="xs"
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
        {UI_LITERALS.category.dialogTitle(categoryFormMode)}
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: "20px !important", pb: 1.75 }}>
        <FormControl sx={{ minWidth: "100%" }}>
          <Stack spacing={2}>
            <TextField
              id="input-with-icon-adornment"
              value={currentCategory.name}
              placeholder={UI_LITERALS.category.placeholder}
              onChange={handleChange("name")}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LabelIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1, flexWrap: "wrap" }}>
        <Button color="secondary" onClick={() => setCategoryFormOpen(false)}>
          {UI_LITERALS.common.cancel}
        </Button>
        <Button color="primary" variant="contained" onClick={handleSave}>
          {UI_LITERALS.common.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
