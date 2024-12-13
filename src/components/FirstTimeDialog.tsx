import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';

interface FirstTimeDialogProps {
    open: boolean;
    onClose: () => void;
}

const FirstTimeDialog: React.FC<FirstTimeDialogProps> = ({ open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Welcome to BrowserHub 0.0.1</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginBottom: 1 }}>
                    This web application is still on progress.  There are features that may not work as intended or they are just not finished yet.    
                </DialogContentText>
                <DialogContentText sx={{ marginBottom: 1 }}>
                    This application was created and developed by  
                    <Link
                    sx={{marginLeft: 1}}
                    href={"https://albertcasti-portfolio.vercel.app/"}
                    target="_blank"
                    rel="noopener"
                    >
                        Albert Castiñeira
                    </Link>    
                </DialogContentText>                 
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FirstTimeDialog;
