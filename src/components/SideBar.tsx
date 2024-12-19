import React, { useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryList from "./CategoryList";
import { Category } from "../domain/interfaces/Category.interface";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GlobalContext } from "../context/GlobalContext";
import { CURRENT_VERSION_APP } from "../utils/constants";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface SidebarProps {
    handleOpenSettings: () => void;
    categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleOpenSettings }) => {
    const { setCategoryFormOpen, categoryFormOpen, setCurrentCategoryId, setHelpDialogOpen } = useContext(GlobalContext);

    const handleNewCategoryClick = () => {
        setCurrentCategoryId("");
        setCategoryFormOpen(!categoryFormOpen);
    }

    return(
        <Box sx={{ width: "100%" }} p={2}>
            <Stack alignItems="center" direction="row" gap={0.2} sx={{ marginBottom: 4, display: "flex" }}>
                <Typography variant="h5" fontWeight={"bold"}>
                    Browser
                </Typography>
                <Typography variant="h5" fontWeight={"bold"} sx={{ color: "primary.main" }}>
                    Hub
                </Typography>
                <Box sx={{marginLeft: 1, border: 1, borderRadius: "5px", paddingX: 1, fontSize:"0.8em", fontWeight: "bold", color: "primary.main", borderColor: "primary.main"}}>
                    {CURRENT_VERSION_APP}
                </Box>
            </Stack>
            <CategoryList />
            <Stack spacing={2}>
                <Button onClick={() => handleNewCategoryClick()} variant="contained" sx={{height: "4em", fontWeight: "bold"}} startIcon={<AddCircleIcon />} >
                    New category
                </Button>
                <Button variant="outlined" startIcon={<SettingsIcon fontSize="small" />} onClick={handleOpenSettings}>
                    Settings
                </Button>
                <Button variant="text" startIcon={<HelpOutlineIcon fontSize="small" />} onClick={() => setHelpDialogOpen(true)}>
                    Help
                </Button>
            </Stack>
        </Box>
    );
};

export default Sidebar;