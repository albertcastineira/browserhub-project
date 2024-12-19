import React, { useContext, useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { GlobalContext } from '../context/GlobalContext';
import LabelIcon from '@mui/icons-material/Label';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CategoryProps {
    name: string;
    id: string;
    onDelete: () => void;
    onEdit: () => void;
}

const Category: React.FC<CategoryProps> = ({ name, id, onDelete, onEdit }) => {
    const { setSelectedCategory, selectedCategory } = useContext(GlobalContext);
    const categoryActive = selectedCategory === id ? "contained" : "text";
    const fontWeight = selectedCategory === id ? "bold" : "normal";

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(id != "0") {
            event.preventDefault();
            setAnchorEl(event.currentTarget);
        }
        
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{width: "100%"}}>
                <Button
                    onClick={() => setSelectedCategory(id)}
                    onContextMenu={handleClick}
                    variant={categoryActive}
                    sx={{justifyContent: "flex-start", fontWeight: fontWeight, width: "100%", textTransform: "none" }}
                    startIcon={<LabelIcon />}
                    style={{ textTransform: "none" }}
                >
                    {name}
                </Button>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                sx={{ marginTop: 8 }}
            >
                <MenuItem onClick={() => { handleClose(); onEdit(); }} disableRipple>
                    <EditIcon sx={{ marginRight: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); onDelete(); }} disableRipple sx={{ color: 'red' }}>
                    <DeleteIcon sx={{ marginRight: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default Category;
