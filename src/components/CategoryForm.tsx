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
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {UI_LITERALS.category.dialogTitle(categoryFormMode)}
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <FormControl sx={{ minWidth: "100%" }}>
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
            sx={{ marginBottom: 2 }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
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
