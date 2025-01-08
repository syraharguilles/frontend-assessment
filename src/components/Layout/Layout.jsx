import React from 'react';
import { Grid, Box } from '@mui/material';
import Header from './Header';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <Grid container sx={{ flex: 1 }}>
        {/* Sidebar */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            
          }}
        >
          <SideBar />
        </Grid>
        {/* Main Content */}
        <Grid item xs={12} sm={9} sx={{ padding: 2 }}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
