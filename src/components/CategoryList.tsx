import React, { useContext } from "react";
import Category from "./Category";
import { Box, Typography } from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";

const CategoryList: React.FC = () => {

    const { categories, setCategoryFormMode, setCurrentCategoryId, setCategoryFormOpen, categoryFormOpen, deleteCategory } = useContext(GlobalContext);

    const handleEditCategory = (categoryId: string) => {
        setCategoryFormMode("Edit");
        setCurrentCategoryId(categoryId);
        setCategoryFormOpen(!categoryFormOpen);
    }
    
    const handleDeleteCategory = (categoryId: string) => {
        deleteCategory(categoryId);
    }

    return(
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            Categories
        </Typography>
        <Box sx={{ maxHeight: "50vh", scrollBehavior: "auto", overflow: "auto" }}>
            {categories.map((category) => (
                <Category 
                    key={category.name} 
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