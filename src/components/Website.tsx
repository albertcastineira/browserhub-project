import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LanguageIcon from '@mui/icons-material/Language';

export interface WebsiteProps {
    name: string;
    iconName: string;
    url: string;
    categoryId: string;
    onDelete: () => void;
    onEdit: () => void;
}

const Website: React.FC<WebsiteProps> = ({ categoryId, name, url, iconName, onDelete, onEdit }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpenNewTab = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        window.open(url, '_blank');
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>  <Box sx={{bgcolor: "primary.main",  borderRadius: 1}}>
            <Button
                id={`Website_${name}_${categoryId}`}
                onClick={handleOpenNewTab}
                onContextMenu={handleClick}
                sx={{
                    width: '100%',
                    height: "8em",
                    fontWeight: "bold",
                    paddingTop: 6,
                    color: "white"
                   
                }}
                disableRipple
            >
                <Box sx={{position: "absolute", top: "23px", zIndex: 10, width: "100%"}}>
                    <LanguageIcon sx={{fontSize: "32px"}}/>
                </Box>
                <Box sx={{bgcolor: "primary.main", zIndex: 100, width: "100%"}} className="website-icon">
                    <Icon icon={iconName} width="30" height="30" />
                </Box>
                
                {name}
            </Button>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem sx={{ fontWeight: "bold", marginX: 2 }} disableRipple>
                    <Icon icon={iconName} width="20" height="20" />
                    <p style={{marginLeft: "0.4em"}}>{name}</p>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleClose(); onEdit(); }} disableRipple>
                    <EditIcon sx={{ marginRight: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); onDelete(); }} disableRipple sx={{ color: 'red' }}>
                    <DeleteIcon sx={{ marginRight: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default Website;
