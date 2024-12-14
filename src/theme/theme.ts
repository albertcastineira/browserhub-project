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
    { name: 'Ocean', color: '#1976d2' },
    { name: 'Sky', color: '#00acc1' },
    { name: 'Forest', color: '#009688' },
    { name: 'Nature', color: '#4caf50' },
    { name: 'Pumkin', color: '#e65100' },
    { name: 'Cherry', color: '#bf360c' },
];


export default defaultTheme;
