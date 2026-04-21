import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff6b35",
    },
    background: {
      default: "#eef3f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c2434",
      secondary: "#5a667a",
    },
  },
});

export const defaultThemePrimaryColors = [
  { name: "Ocean", color: "#1976d2" },
  { name: "Sky", color: "#00acc1" },
  { name: "Forest", color: "#009688" },
  { name: "Nature", color: "#4caf50" },
  { name: "Pumkin", color: "#e65100" },
  { name: "Cherry", color: "#bf360c" },
];

export const buildAppTheme = (mode: PaletteMode, primaryColor: string) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: "#ff6b35",
      },
      background: isDark
        ? {
            default: "#12161f",
            paper: "#1a2030",
          }
        : {
            default: "#eef3f9",
            paper: "#ffffff",
          },
      text: isDark
        ? {
            primary: "#e9eefc",
            secondary: "#b5bfd6",
          }
        : {
            primary: "#1c2434",
            secondary: "#5a667a",
          },
      divider: isDark ? "#2a344b" : "#dce3ef",
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(4px)",
          },
        },
      },
    },
  });
};

export default defaultTheme;
