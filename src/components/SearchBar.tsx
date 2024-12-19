import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ImageIcon from '@mui/icons-material/Image';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@emotion/react';

export default function SearchBar() {
  const theme = useTheme();
  const [searchType, setSearchType] = useState('Default');
  const [query, setQuery] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSearchType(newValue);
    console.log(event);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      let baseUrl = 'https://www.google.com/search?q=';
      switch (searchType) {
        case 'Default':
          window.open(`${baseUrl}${encodeURIComponent(query)}`, '_blank');
          break;
        case 'Images':
          window.open(`${baseUrl}${encodeURIComponent(query)}&udm=2`, '_blank');
          break;
        case 'Videos':
          window.open(`${baseUrl}${encodeURIComponent(query)}&udm=7`, '_blank');
          break; 
        case 'Maps':
          window.open(`https://www.google.com/maps?q=${encodeURIComponent(query)}`, '_blank');
          break;
        case 'News':
          window.open(`${baseUrl}${encodeURIComponent(query)}&tbm=nws`, '_blank');
          break;
        default:
          window.open(baseUrl, '_blank');
      }
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "400" }}
      onSubmit={handleSearch}
    >
      <InputBase
        sx={{ 
          ml: 1, flex: 1 
          
        }}
        placeholder={`${searchType} search ...`}
        inputProps={{ 'aria-label': `search google ${searchType}` }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Tabs
        value={searchType}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="search type tabs"
      >
        <Tab value="Default" icon={<SearchIcon />} />
        <Tab value="Images" icon={<ImageIcon />} />
        <Tab value="Videos" icon={<SlideshowIcon />} />
        <Tab value="Maps" icon={<DirectionsIcon />} />
        <Tab value="News" icon={<NewspaperIcon />} />
      </Tabs>
    </Paper>
  );
}
