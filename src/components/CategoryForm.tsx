import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, SelectChangeEvent, TextField } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import { GlobalContext } from '../context/GlobalContext';
import { EMPTY_CATEGORY } from '../context/defaultValues';
import { Category } from '../domain/interfaces/Category.interface';


const CategoryForm: React.FC = () => {

    const {
        currentCategoryId,
        findCategory,
        createCategory,
        updateCategory,
        categories,
        categoryFormOpen, setCategoryFormOpen, categoryFormMode
    } = useContext(GlobalContext);

    const [currentCategory, setCurrentCategory] = useState<Category>(EMPTY_CATEGORY);

    useEffect(() => {
        if (currentCategoryId != "0") {
            const category = findCategory(currentCategoryId);
            setCurrentCategory(category || EMPTY_CATEGORY);
        } else {
            setCurrentCategory(EMPTY_CATEGORY);
        }
    }, [currentCategoryId, findCategory]);

    const handleChange = (field: keyof Category) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const value = event.target.value;
        setCurrentCategory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        const updatedCategory = { ...currentCategory, name: currentCategory.name.trim() };

        if (updatedCategory.id !== "0") {
            updateCategory(updatedCategory.id, updatedCategory);
        } else {
            const newId = (categories.length > 0 ? categories[categories.length - 1].id + 1 : 1);
            updatedCategory.id = String(newId);
            createCategory(updatedCategory);
        }

        setCategoryFormOpen(false);
    };

    return (
        <Dialog open={categoryFormOpen} onClose={() => setCategoryFormOpen(!categoryFormOpen)} maxWidth="xs" fullWidth={true} >
            <DialogTitle>{categoryFormMode} category</DialogTitle>
            <DialogContent>
                <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                        id="input-with-icon-adornment"
                        value={currentCategory.name}
                        placeholder='My Category'
                        onChange={handleChange("name")}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LabelIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={() => setCategoryFormOpen(!categoryFormOpen)}>Cancel</Button>
                <Button color='primary' variant='contained' onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryForm;
