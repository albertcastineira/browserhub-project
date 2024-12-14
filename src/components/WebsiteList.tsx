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
    const { selectedCategory, websites } = useContext(GlobalContext);
    const [filteredWebsites, setFilteredWebsites] = useState<WebsiteInterface[]>([]);

    useEffect(() => {
        if (selectedCategory != "0") {
            const filtered = websites.filter((website) => website.categoryId === selectedCategory);
            setFilteredWebsites(filtered);
        } else {
            setFilteredWebsites(websites);
        }

    }, [selectedCategory, websites]);

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '16px',
                    marginTop: '16px'
                }}
            >
                {filteredWebsites.map((website) => (
                    <div key={website.url} style={{ gridColumn: 'span 2' }}>
                        <Website
                            categoryId={website.categoryId}
                            iconName={getBrandFromUrl(website.url)}
                            name={website.name}
                            url={website.url}
                            onEdit={() => console.log("")}
                            onDelete={() => console.log("")}
                        />
                    </div>
                ))}
            </Box>
            <Button 
                variant="contained" 
                startIcon={<AddCircleIcon />}
                sx={{position: "fixed", top: "90%", right: "3%", height: "4em", fontWeight: "bold"}}>
                Website
            </Button>
        </>
    );
};

export default WebsiteList;
