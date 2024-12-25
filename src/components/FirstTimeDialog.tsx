import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { GlobalContext } from '../context/GlobalContext';
import { CURRENT_VERSION_APP, CURRENT_VERSION_DATE_RELEASE, LOCAL_STORAGE_KEYS } from '../utils/constants';

const FirstTimeDialog: React.FC = () => {

    const { firstTimeDialogOpen, setFirstTimeDialogOpen } = useContext(GlobalContext);

    const userRelease = localStorage.getItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION);
    if (userRelease != CURRENT_VERSION_APP) {
        setFirstTimeDialogOpen(!firstTimeDialogOpen);
        localStorage.setItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION, CURRENT_VERSION_APP)

    }

    return (
        <Dialog open={firstTimeDialogOpen} onClose={() => setFirstTimeDialogOpen(false)}>
            <DialogTitle>Welcome to BrowserHub</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginBottom: 1 }}>
                    <strong>Version {CURRENT_VERSION_APP} - {CURRENT_VERSION_DATE_RELEASE}</strong>
                    <hr />
                </DialogContentText>
                <DialogContentText sx={{ marginBottom: 1 }}>
                    BrowserHub is a web application that allows you to save your favorite websites and access them easily. You can create, edit and delete categories and websites. 
                    To edit or delete just right click on the category or website.
                    <br />
                    You can customize the theme and the main color of the application in the settings tab.
                </DialogContentText>
                <DialogContentText sx={{ marginY: 3 }}>
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
