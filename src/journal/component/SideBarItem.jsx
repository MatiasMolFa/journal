import React, { useMemo } from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material'
import { TurnedInNotOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'


export const SideBarItem = ( { title, body, date, id, imageUrls = []}) => {

    const dispatch = useDispatch()

    const newTitle = useMemo( () => {
        return title.length > 14
            ? title.substring(0,14) + '...'
            : title
    }, [ title ])

    const newBody = useMemo( () => {
        return body.length > 14
            ? body.substring(0,14) + '...'
            : body
    }, [ body ])

    const onClickItem = ( event ) => {
        event.preventDefault();
        dispatch(setActiveNote({title, body, date, id, imageUrls}))
    }

    return (
            <ListItem disablePadding>
                <ListItemButton onClick={onClickItem}>
                    <ListItemIcon>
                        <TurnedInNotOutlined />
                    </ListItemIcon>                 
                    <Grid container>
                        <Grid item xs= {12}>
                            <ListItemText primary={ newTitle } />
                        </Grid>
                        <Grid item xs= {12}>
                            <ListItemText secondary={ newBody !== '' ? newBody : 'Sin descripción'} />
                        </Grid>
                    </Grid>
                </ListItemButton>
            </ListItem>
        )
}

