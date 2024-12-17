import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, TextField } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import { GlobalContext } from '../context/GlobalContext';

interface WebsiteFormProps {
    onSave: () => void;
}

const CategoryForm: React.FC<WebsiteFormProps> = ({ onSave }) => {

    const { categoryFormOpen, setCategoryFormOpen, categoryFormMode } = useContext(GlobalContext);

    return (
        <Dialog open={categoryFormOpen} onClose={() => setCategoryFormOpen(!categoryFormOpen)} maxWidth="xs" fullWidth={true} >
            <DialogTitle>{categoryFormMode} category</DialogTitle>
            <DialogContent>
                <FormControl sx={{ minWidth: "100%"}}>
                    <TextField
                        id="input-with-icon-adornment"
                        
                        placeholder='My Category'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LabelIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                        sx={{marginBottom: 2}}
                    />
                </FormControl>
                          
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={() => setCategoryFormOpen(!categoryFormOpen)}>Cancel</Button>
                <Button color='primary' variant='contained' onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryForm;
