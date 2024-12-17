import React, { useContext, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Website as WebsiteInterface } from '../domain/interfaces/Website.interface';
import Website from './Website';
import { GlobalContext } from '../context/GlobalContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getBrandFromUrl } from '../utils/helpers';

interface WebsiteListProps {
    websites: WebsiteInterface[];
}

const WebsiteList: React.FC<WebsiteListProps> = () => {
    const { selectedCategory, websites, websiteFormOpen, setWebsiteFormOpen, setWebsiteFormMode, setCurrentWebsiteId, deleteWebsite } = useContext(GlobalContext);
    const [filteredWebsites, setFilteredWebsites] = useState<WebsiteInterface[]>([]);

    useEffect(() => {
        if (selectedCategory != "0") {
            const filtered = websites.filter((website) => website.categoryId === selectedCategory);
            setFilteredWebsites(filtered);
        } else {
            setFilteredWebsites(websites);
        }

    }, [selectedCategory, websites]);

    const handleOpenWebsiteForm = () => {
        setWebsiteFormMode("Create");
        setCurrentWebsiteId("0");
        setWebsiteFormOpen(!websiteFormOpen);
    }

    const handleEditWebsite = (websiteId: string) => {
        setWebsiteFormMode("Edit");
        setCurrentWebsiteId(websiteId);
        setWebsiteFormOpen(!websiteFormOpen);
    }

    const handleDeleteWebsite = (websiteId: string) => {
        deleteWebsite(websiteId);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '16px',
                    marginTop: '16px',
                    maxHeight: "85vh",
                    overflowY: "auto",
                }}
            >
                {filteredWebsites.map((website) => (
                    <div key={website.url} style={{ gridColumn: 'span 2' }}>
                        <Website
                            categoryId={website.categoryId}
                            iconName={getBrandFromUrl(website.url)}
                            name={website.name}
                            url={website.url}
                            onEdit={() => handleEditWebsite(website.id)}
                            onDelete={() => handleDeleteWebsite(website.id)}
                        />
                    </div>
                ))}
            </Box>
            <Button
                onClick={handleOpenWebsiteForm}
                variant="contained" 
                startIcon={<AddCircleIcon />}
                sx={{
                    position: "fixed", 
                    top: "90%", 
                    right: "3%", 
                    zIndex: 1000,
                    height: "4em", 
                    fontWeight: "bold"
                }}>
                Website
            </Button>
        </>
    );
};

export default WebsiteList;
