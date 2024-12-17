import React from "react";
import { Category as CategoryInterface } from "../domain/interfaces/Category.interface";
import Category from "./Category";
import { Box, Typography } from "@mui/material";

interface CategoryListProps {
  categories: CategoryInterface[];
}

const CategoryList: React.FC<CategoryListProps> = ({categories}) => (
    <Box sx={{marginBottom: 6}}>
        <Typography variant="h6" sx={{marginBottom: 2}}>Categories</Typography>
        <Box sx={{maxHeight: "50vh", scrollBehavior: "auto", overflow: "auto"}}>
            {categories.map((category) => (
                <Category key={category.name} name={category.name} id={category.id} />
            ))}
        </Box>
    </Box>
);

export default CategoryList;