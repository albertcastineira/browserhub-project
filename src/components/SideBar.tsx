import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import CategoryList from "./CategoryList";
import { Category } from "../domain/interfaces/Category.interface";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface SidebarProps {
    handleOpenSettings: () => void;
    categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleOpenSettings, categories }) => (
    <Box sx={{ width: "100%" }} p={2}>
        <Stack alignItems="center" direction="row" gap={0.2} sx={{ marginBottom: 4 }}>
            <LanguageIcon
                sx={{ backgroundColor: "#311b92", color: "white", marginRight: 1, padding: 0.4, borderRadius: 1 }}
            />
            <Typography variant="h5" fontWeight={"bold"}>
                BrowserHub
            </Typography>
        </Stack>
        <CategoryList categories={categories} />
        <Stack spacing={2}>
            <Button variant="contained" sx={{height: "4em", fontWeight: "bold"}} startIcon={<AddCircleIcon />} >
                New category
            </Button>
            <Button variant="outlined" startIcon={<SettingsIcon fontSize="small" />} onClick={handleOpenSettings}>
                Settings
            </Button>
        </Stack>
    </Box>
);

export default Sidebar;