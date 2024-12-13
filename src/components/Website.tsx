import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

export interface WebsiteProps {
    name: string;
    iconName: string;
    url: string;
    categoryId: string;
}

const Website: React.FC<WebsiteProps> = ({ categoryId, name, url, iconName }) => {

    const handleOpenNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <Button
            key={`$Website_${name}_${categoryId}`}
            variant="contained"
            startIcon={<Icon icon={iconName} width="30" height="30" />} 
            onClick={() => handleOpenNewTab(url)}
            sx={{
                width: '100%',
                height: "10vh",
                fontWeight: "bold",
            }}
        >
            {name}
        </Button>
    );
};

export default Website;
