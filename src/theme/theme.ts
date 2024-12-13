import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    colorSchemes: {
      dark: true,
    },
    palette: {
        mode: "light",
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50',
        },
    },
});

export const defaultThemePrimaryColors = [
    '#1976d2', // Blue
    '#4caf50', // Green
    '#f57c00', // Orange
    '#EAB308', // Yellow
    '#00acc1', // Cyan
    '#9c27b0', // Purple
];

export default defaultTheme;
