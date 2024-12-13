import React, { useContext } from 'react';
import { Box, Grid2 } from '@mui/material';
import Sidebar from './SideBar';
import SearchBar from './SearchBar';
import { useTheme } from '@mui/system';
import WebsiteList from './WebsiteList';
import { GlobalContext } from '../context/GlobalContext';

interface LayoutProps {
  handleOpenSettings: () => void;
}

const Layout: React.FC<LayoutProps> = ({ handleOpenSettings }) => {
  const theme = useTheme();
  const { categories, websites } = useContext(GlobalContext);

  return (
    <Grid2 container>
      <Box 
        sx={{ width: '15%', minHeight: "100vh" }} 
        boxShadow={1}
      >
        <Sidebar categories={categories} handleOpenSettings={handleOpenSettings} />
      </Box>
      <Box 
        sx={{ width: '85%', bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800], }}
        p={2}
      >
        <SearchBar />
        <WebsiteList websites={websites} />
      </Box>
    </Grid2>
  );
};

export default Layout;
