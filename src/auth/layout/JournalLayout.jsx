import React from 'react'
import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar } from '../../journal/component/NavBar';
import { SideBar } from '../../journal/component/SideBar';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex'}}>
        <NavBar drawerWidth = {drawerWidth} />

        <SideBar drawerWidth={drawerWidth} />

        <Box component='main' sx={{ flexGrow: 1, p: 3}}>
            <Toolbar />

            { children }
        </Box>
    </Box>
  )
}
