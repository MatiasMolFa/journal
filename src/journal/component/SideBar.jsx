import React from 'react'
import { Drawer,Box, Toolbar, Typography, Divider, List } from "@mui/material"
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName, email } = useSelector( state => state.auth)
    const { notes } = useSelector( state => state.journal)

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0}}}
        >
            <Drawer 
                variant="permanent"
                open
                sx= {{
                        display: { xs: 'block'},
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'> {displayName != null ? displayName : email} </Typography>
                </Toolbar>
                <Divider />
                <List>
                {
                        notes.map( note => (
                            <SideBarItem key={note.id} {...note}/>
                        ))
                
                }

                </List>
            </Drawer>
        </Box>
    )
}
