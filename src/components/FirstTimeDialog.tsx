import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { GlobalContext } from '../context/GlobalContext';
import { CURRENT_VERSION_APP, LOCAL_STORAGE_KEYS } from '../utils/constants';

const FirstTimeDialog: React.FC = () => {

    const { firstTimeDialogOpen, setFirstTimeDialogOpen } = useContext(GlobalContext);

    const userRelease = localStorage.getItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION);
    if (userRelease != CURRENT_VERSION_APP) {
        setFirstTimeDialogOpen(!firstTimeDialogOpen);
        localStorage.setItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION, CURRENT_VERSION_APP)

    }

    return (
        <Dialog open={firstTimeDialogOpen} onClose={() => setFirstTimeDialogOpen(false)}>
            <DialogTitle>Welcome to BrowserHub {CURRENT_VERSION_APP} Release</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginBottom: 1 }}>
                    This web application is still on progress.  There are features that may not work as intended or they are just not finished yet.
                </DialogContentText>
                <DialogContentText sx={{ marginBottom: 1 }}>
                    This application was created and developed by
                    <Link
                        sx={{ marginLeft: 1 }}
                        href={"https://albertcasti-portfolio.vercel.app/"}
                        target="_blank"
                        rel="noopener"
                    >
                        Albert Castiñeira
                    </Link>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={() => setFirstTimeDialogOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FirstTimeDialog;
