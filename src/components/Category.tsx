import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { GlobalContext } from '../context/GlobalContext';

interface CategoryListProps {
    name: string;
    id: string;
}

const Category: React.FC<CategoryListProps> = ({ name, id }) => {
    const { setSelectedCategory, selectedCategory } = useContext(GlobalContext);
    const categoryActive = selectedCategory === id ? "contained": "text";

    return (
        <Box>
            <Button
                onClick={() => setSelectedCategory(id)}
                variant={categoryActive}
                sx={{ textAlign: "left" }}
            >
                {name}
            </Button>
        </Box>
    );
};

export default Category;
