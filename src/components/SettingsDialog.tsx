import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@mui/material';
import { defaultThemePrimaryColors } from '../theme/theme';

interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
    onChangePrimaryColor: (newColor: string) => void;
    mode: string | undefined;
    onChangeThemeMode: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose, onChangePrimaryColor, onChangeThemeMode, mode }) => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(mode === 'dark');

    useEffect(() => {
        setIsDarkModeEnabled(mode === 'dark');
    }, [mode]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Preferences</DialogTitle>
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

                <DialogContentText sx={{ marginTop: 3 }}>Select your theme color:</DialogContentText>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {defaultThemePrimaryColors.map((color) => (
                        <Button
                            key={color}
                            onClick={() => onChangePrimaryColor(color)}
                            sx={{
                                backgroundColor: color,
                                height: 30,
                                width: 5,
                                margin: 1,
                                borderRadius: '10%',
                            }}
                        />
                    ))}
                </div>
                
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
