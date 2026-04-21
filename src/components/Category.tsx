import React, { useContext, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ALL_CATEGORY_ID } from "../utils/constants";
import { UI_LITERALS } from "../i18n/literals";

interface CategoryProps {
  name: string;
  id: string;
  onDelete: () => void;
  onEdit: () => void;
}

const Category: React.FC<CategoryProps> = ({ name, id, onDelete, onEdit }) => {
  const { setSelectedCategory, selectedCategory } = useContext(GlobalContext);
  const categoryActive = selectedCategory === id;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (id !== ALL_CATEGORY_ID) {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Button
          onClick={() => setSelectedCategory(id)}
          onContextMenu={handleClick}
          variant={categoryActive ? "contained" : "text"}
          sx={{
            justifyContent: "flex-start",
            fontWeight: categoryActive ? 700 : 500,
            width: "100%",
            textTransform: "none",
            borderRadius: 2,
            mb: 0.5,
            px: 1.25,
            color: categoryActive ? "primary.contrastText" : "text.primary",
            backgroundColor: categoryActive ? "primary.main" : "transparent",
            "&:hover": {
              backgroundColor: categoryActive ? "primary.dark" : "action.hover",
            },
          }}
          startIcon={<LabelIcon />}
        >
          {name}
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{ marginTop: 8 }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              minWidth: 130,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
          }}
          disableRipple
        >
          <EditIcon sx={{ marginRight: 1 }} /> {UI_LITERALS.common.edit}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
          disableRipple
          sx={{ color: "red" }}
        >
          <DeleteIcon sx={{ marginRight: 1 }} /> {UI_LITERALS.common.delete}
        </MenuItem>
      </Menu>
    </>
  );
};

export default Category;
