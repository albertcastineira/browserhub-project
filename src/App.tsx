import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import defaultTheme from './theme/theme';
import { createTheme } from '@mui/material';
import SettingsDialog from './components/SettingsDialog';
import Layout from './components/Layout';
import { CURRENT_VERSION_APP, LOCAL_STORAGE_KEYS } from './utils/constants';
import { GlobalContextProvider } from './context/GlobalContext';
import FirstTimeDialog from './components/FirstTimeDialog';


function App() {
    const [primaryColor, setPrimaryColor] = useState(defaultTheme.palette.primary.main);
    const [mode, setMode] = useState(defaultTheme.palette.mode);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [firsTimeDialogOpen, setFirsTimeDialogOpen] = useState(false);

    useEffect(() => {
        const storedColor = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_COLOR);
        if (storedColor) {
            setPrimaryColor(storedColor);
        } else {
            setPrimaryColor(defaultTheme.palette.primary.main);
            localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_COLOR, defaultTheme.palette.primary.main);
        }

        const storedMode = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_MODE);
        if (storedMode) {
            setMode(storedMode as 'light' | 'dark');
        } else {
            const defaultMode = 'light';
            setMode(defaultMode);
            localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_MODE, defaultMode);
        }

        const userRelease = localStorage.getItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION);
        if(userRelease != CURRENT_VERSION_APP) {
            setFirsTimeDialogOpen(!firsTimeDialogOpen);
            localStorage.setItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION, CURRENT_VERSION_APP)
            
        }
    }, [setPrimaryColor, setMode, firsTimeDialogOpen]);

    const handleToggleSettingsDialog = () => {
        setSettingsOpen(!settingsOpen);
    };

    const handletoggleFirstTimeDialog = () => {
        setFirsTimeDialogOpen(!firsTimeDialogOpen);
    }

    const handleChangePrimaryColor = (newColor: string) => {
        setPrimaryColor(newColor);
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_COLOR, newColor);
    };

    const handleChangeThemeMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_MODE, newMode);
    };

    const currentTheme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: primaryColor,
            },
            secondary: defaultTheme.palette.secondary,
        },
    });

    return (
        <GlobalContextProvider>
            <MuiThemeProvider theme={currentTheme}>
                <CssBaseline />
                <Layout handleOpenSettings={handleToggleSettingsDialog} />

                {/* Dialogs */}
                <SettingsDialog
                    open={settingsOpen}
                    mode={mode}
                    onClose={handleToggleSettingsDialog}
                    onChangePrimaryColor={handleChangePrimaryColor}
                    onChangeThemeMode={handleChangeThemeMode}
                />
                <FirstTimeDialog 
                    open={firsTimeDialogOpen}
                    onClose={handletoggleFirstTimeDialog}
                />
            </MuiThemeProvider>
        </GlobalContextProvider>
    );
}

export default App;
