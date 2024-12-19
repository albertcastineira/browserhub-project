import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { GlobalContext } from '../context/GlobalContext';
import { DialogContentText } from '@mui/material';

const HelpDialog: React.FC = () => {
    const { helpDialogOpen, setHelpDialogOpen } = useContext(GlobalContext);

    return (
        <Dialog open={helpDialogOpen} onClose={() => setHelpDialogOpen(false)}  maxWidth="md" fullWidth={true}>
            <DialogTitle>HELP</DialogTitle>
            <DialogContent>
            <DialogContentText>
                    <h4>Searchbar</h4>
                </DialogContentText>
                <DialogContentText>
                    On the top of the screen there is a searchbar where you can search on google using a selected option. 
                    There are 5 options: normal search, images, videos, news and maps.
                </DialogContentText>

                <DialogContentText>
                    <h4>Categories</h4>
                </DialogContentText>
                <DialogContentText>
                    On the left sidebar there is a list of categories. You can create, edit and delete categories by right clicking on them.
                    <br /> The only category that cannot be deleted is the "All categories" category.
                </DialogContentText>

                <DialogContentText>
                    <h4>Websites</h4>
                </DialogContentText>
                <DialogContentText>
                    On the bottom right corner of the screen there is a button to add a new website. You can also edit and delete websites by right clicking on them.
                </DialogContentText>

                <DialogContentText>
                    <h4>Theme and customization</h4>
                </DialogContentText>
                <DialogContentText>
                    On the settings tab you can change the main color theme and the theme mode (light or dark).
                </DialogContentText>

                <DialogContentText>
                    <h4>Data persistance</h4>
                </DialogContentText>
                <DialogContentText>
                    BrowserHub uses localStorage for data persistance. This means that your data will be saved on your browser and will be available even if you close the tab or the browser.
                    <br /> If you need to manage your data you can go to the settings tab and export, import or restore the data.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setHelpDialogOpen(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HelpDialog;