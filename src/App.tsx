import { useState, useEffect, useContext } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import defaultTheme from './theme/theme';
import { createTheme } from '@mui/material';
import SettingsDialog from './components/SettingsDialog';
import Layout from './components/Layout';
import { CURRENT_VERSION_APP, LOCAL_STORAGE_KEYS } from './utils/constants';
import { GlobalContext, GlobalContextProvider } from './context/GlobalContext';
import FirstTimeDialog from './components/FirstTimeDialog';
import WebsiteForm from './components/WebsiteForm';
import CategoryForm from './components/CategoryForm';


function App() {
    const { 
        setFirstTimeDialogOpen, 
        firstTimeDialogOpen, 
    } = useContext(GlobalContext);

    const [primaryColor, setPrimaryColor] = useState(defaultTheme.palette.primary.main);
    const [mode, setMode] = useState(defaultTheme.palette.mode);

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
            setFirstTimeDialogOpen(!firstTimeDialogOpen);
            localStorage.setItem(LOCAL_STORAGE_KEYS.RELEASE_VERSION, CURRENT_VERSION_APP)
            
        }
    }, [setPrimaryColor, setMode, firstTimeDialogOpen]);

    const handletoggleFirstTimeDialog = () => {
        setFirstTimeDialogOpen(!firstTimeDialogOpen);
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
                <CssBaseline enableColorScheme />
                <Layout />

                {/* User Dialogs */}
                <SettingsDialog
                    mode={mode}
                    onChangePrimaryColor={handleChangePrimaryColor}
                    onChangeThemeMode={handleChangeThemeMode}
                />
                <FirstTimeDialog 
                    onClose={handletoggleFirstTimeDialog}
                />

                {/* Form Dialogs */}
                <WebsiteForm />
                <CategoryForm 
                    onSave={() => console.log("")}
                />
            </MuiThemeProvider>
        </GlobalContextProvider>
    );
}

export default App;