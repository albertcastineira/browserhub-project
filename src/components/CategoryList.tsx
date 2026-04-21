import React, { useContext } from "react";
import Category from "./Category";
import { Box, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { GlobalContext } from "../context/GlobalContext";
import { FORM_MODES } from "../utils/constants";
import { UI_LITERALS } from "../i18n/literals";

const CategoryList: React.FC = () => {
  const {
    categories,
    setCategoryFormMode,
    setCurrentCategoryId,
    setCategoryFormOpen,
    deleteCategory,
  } = useContext(GlobalContext);

  const handleEditCategory = (categoryId: string) => {
    setCategoryFormMode(FORM_MODES.EDIT);
    setCurrentCategoryId(categoryId);
    setCategoryFormOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  return (
    <Box
      sx={{
        marginBottom: 3,
        borderRadius: 1.25,
        border: 1,
        borderColor: "divider",
        p: 0.875,
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#e8eef8" : "#172032",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          marginBottom: 1,
          px: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          fontWeight: 800,
          color: "text.primary",
        }}
      >
        <CategoryIcon fontSize="small" />
        {UI_LITERALS.category.title}
      </Typography>
      <Box
        sx={{
          maxHeight: "44vh",
          scrollBehavior: "auto",
          overflow: "auto",
          pr: 0.25,
        }}
      >
        {categories.map((category) => (
          <Category
            key={category.id}
            name={category.name}
            id={category.id}
            onEdit={() => handleEditCategory(category.id)}
            onDelete={() => handleDeleteCategory(category.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
