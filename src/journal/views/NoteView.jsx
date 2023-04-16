import React, { useEffect, useMemo, useRef } from 'react'
import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Grid, Typography, Button, TextField } from '@mui/material'
import { ImageGallery } from '../component/ImageGallery'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeleteNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunk'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active:note, isSaving, messageSaved } = useSelector( state => state.journal)

    const { body, title, date, formState, onInputChange } = useForm( note )

    const dateString = useMemo( () => {
        const newDate = new Date( date )
        return newDate.toDateString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch( setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if( messageSaved.length > 0){
            Swal.fire(`Nota: ${title}`, messageSaved, 'success');
        }
    }, [messageSaved])

    const onSaveNote = ( event ) => {
        event.preventDefault()
        dispatch(startSaveNote())
    }

    const onDeleteNote = ( event ) => {
        event.preventDefault()
        Swal.fire({
            title: '¿Deseas eliminar la nota seleccionada?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor: '#262254',
            denyButtonColor: '#ff1744'
        }).then((result) =>{
            if(result.isConfirmed) dispatch( startDeleteNote())
        })
    }

    const onInputFileChange = ({ target }) => {
        if( target.files === 0 ) return
        dispatch( startUploadingFiles(target.files))
    }

    return (
        <form className='animate__animated animate__fadeIn' >
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
            <Typography fontSize={39} fontWeight="light">
                {dateString !== null ? dateString : "Sin Fecha"}
            </Typography>
            </Grid>
            <Grid item>
                <input
                    type="file" 
                    onChange={onInputFileChange}
                    style={{ display:'none'}}
                    ref={fileInputRef}
                />
                <Button
                    color="primary" 
                    sx={{ p: 2 }}
                    onClick={() => fileInputRef.current.click()}
                    disabled={isSaving}
                >
                    <UploadFileOutlined sx={{ fontSize: 30, mr: 1 }} />
                </Button>
                <Button 
                    color="primary" 
                    sx={{ p: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                            Guardar
                </Button>
            </Grid>
            <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: "none", mb: 1 }}
                name="title"
                value={title === 'Nueva nota' ? '' : title}
                onChange={ onInputChange }
            />
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió el día de hoy?"
                sx={{ border: "none", mb: 1 }}
                minRows={5}
                name="body"
                value={body}
                onChange={ onInputChange }
            />
            </Grid>
            <Grid container justifyContent='end'>
                <Grid item>
                    <Button 
                        color="error" 
                        sx={{ p: 2 }}
                        onClick={onDeleteNote}
                        disabled={isSaving}
                        >
                            <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
                                Eliminar
                    </Button>
                </Grid>
            </Grid>
            <ImageGallery />
        </Grid>
        </form>
    )
}
