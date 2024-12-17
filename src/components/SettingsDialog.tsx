import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Switch } from '@mui/material';
import { defaultThemePrimaryColors } from '../theme/theme';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GlobalContext } from '../context/GlobalContext';

interface SettingsDialogProps {
    onChangePrimaryColor: (newColor: string) => void;
    mode: string | undefined;
    onChangeThemeMode: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onChangePrimaryColor, onChangeThemeMode, mode }) => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(mode === 'dark');
    const { settingsOpen, setSettingsOpen } = useContext(GlobalContext);


    useEffect(() => {
        setIsDarkModeEnabled(mode === 'dark');
    }, [mode]);

    const handleClose = () => {
        setSettingsOpen(!settingsOpen);
    }

    return (
        <Dialog open={settingsOpen} onClose={handleClose}>
            <DialogTitle sx={{borderBottom: 1}}>
                Settings
            </DialogTitle>
            <DialogContent>

                <DialogContentText>
                    <h4>Theme</h4>
                </DialogContentText>
                <DialogContentText sx={{ marginBottom: 1 }}>Toggle dark mode:</DialogContentText>
                <Switch
                    checked={isDarkModeEnabled}
                    onChange={() => {
                        onChangeThemeMode();
                        setIsDarkModeEnabled(!isDarkModeEnabled);
                    }}
                />

                <DialogContentText sx={{ marginTop: 3 }}>Select your theme:</DialogContentText>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {defaultThemePrimaryColors.map((color) => (
                        <Box key={color.color} sx={{ textAlign: "center" }}>
                            <Button
                                key={color.name}
                                onClick={() => onChangePrimaryColor(color.color)}
                                sx={{
                                    backgroundColor: color.color,
                                    height: 30,
                                    width: 5,
                                    margin: 1,
                                    borderRadius: '10%',
                                }}
                            />
                             <DialogContentText>{color.name}</DialogContentText>
                        </Box>
                    ))}
                </div>

                <Divider sx={{ marginTop: 2 }} />

                <DialogContentText>
                    <h4>Manage data</h4>
                </DialogContentText>

                <Box>
                    <Button startIcon={<FileUploadIcon />} variant="contained" sx={{ marginRight: 2 }}>
                        Import
                    </Button>
                    <Button startIcon={<DownloadIcon />} variant="outlined">
                        Export
                    </Button>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
