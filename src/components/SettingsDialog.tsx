import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Switch,
    Typography,
} from '@mui/material';
import { defaultThemePrimaryColors } from '../theme/theme';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GlobalContext } from '../context/GlobalContext';
import { downloadStoredBrowserData, loadStoredBrowserData } from '../utils/helpers';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { DEFAULT_CATEGORIES, DEFAULT_WEBSITES } from '../context/defaultValues';

interface SettingsDialogProps {
    onChangePrimaryColor: (newColor: string) => void;
    mode: string | undefined;
    onChangeThemeMode: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
    onChangePrimaryColor,
    onChangeThemeMode,
    mode,
}) => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(mode === 'dark');
    const { settingsOpen, setSettingsOpen, setCategories, setWebsites } = useContext(GlobalContext);

    useEffect(() => {
        setIsDarkModeEnabled(mode === 'dark');
    }, [mode]);

    const handleClose = () => {
        setSettingsOpen(!settingsOpen);
    };

    const handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            console.log('Selected file:', file);
    
            try {
                loadStoredBrowserData(file);

                const storedData = localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_DATA);
                if (!storedData) {
                    console.warn("No data found in local storage.");
                    return;
                }
    
                const parsedData = JSON.parse(storedData);
    
                // Validate the structure of the parsed data
                if (parsedData && parsedData.categories && parsedData.websites) {
                    setCategories(parsedData.categories);
                    setWebsites(parsedData.websites);
                    localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_DATA, JSON.stringify(parsedData));
                } else {
                    console.error("Invalid data format in local storage.");
                }
            } catch (error) {
                console.error("Error handling file change:", error);
            }
        } else {
            console.warn("No file selected.");
        }
    };
    
    const handleImportClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => handleFileChange(event);
        input.click();
    };
    
    const handleResetData = () => {
        setCategories(DEFAULT_CATEGORIES);
        setWebsites(DEFAULT_WEBSITES);
        localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_DATA, JSON.stringify({ categories: DEFAULT_CATEGORIES, websites: DEFAULT_WEBSITES }));
    }
    

    return (
        <Dialog open={settingsOpen} onClose={handleClose}>
            <DialogTitle sx={{ borderBottom: 1 }}>
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
                                    color: 'white',
                                    px: 4,
                                    py: 1,
                                    height: 30,
                                    width: 5,
                                    margin: 1,
                                    borderRadius: '5px',
                                }}
                            >
                                {color.name}
                            </Button>
                            
                        </Box>
                    ))}
                </div>

                <Divider sx={{ marginTop: 2 }} />

                <DialogContentText>
                    <h4>Manage data</h4>
                </DialogContentText>

                <Box>
                    <Button
                        startIcon={<FileUploadIcon />}
                        variant="contained"
                        onClick={handleImportClick}
                        sx={{ marginRight: 2 }}
                    >
                        Import
                    </Button>
                    <Button
                        onClick={() => downloadStoredBrowserData()}
                        startIcon={<DownloadIcon />}
                        variant="outlined"
                    >
                        Export
                    </Button>
                </Box>

                <Box sx={{marginTop: 3, borderRadius: 2}}>
                    <Typography variant="h6" color="red">
                        Danger zone
                    </Typography>
                    <Button
                            variant="outlined"
                            onClick={() => handleResetData()}
                            sx={{marginTop: 2}}
                            color='secondary'
                        >
                            Reset default
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
