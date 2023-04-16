import React from 'react'
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../../auth/layout/JournalLayout'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { NoteView } from '../views/NoteView'
import 'animate.css'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunk'

export const JournalPage = () => {

  const dispatch = useDispatch()

  const { isSaving, active } = useSelector( state => state.journal)

  const handleNewNote = ( event ) =>{
    event.preventDefault();
    dispatch(startNewNote())
  }


  return (
    <JournalLayout className='animate__animated animate__fadeIn'>
      {/*<Typography> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet similique, earum, quia exercitationem totam harum inventore eos illo explicabo fugit autem minus ipsam quos, distinctio error dolores aut sapiente eius architecto sed quod. Laborum iste, quisquam perferendis consectetur necessitatibus obcaecati.</Typography>*/}
      { active !== null && (<NoteView/> )}
      { active === null && (<NothingSelectedView />)}
      <IconButton
        onClick={handleNewNote}
        size='large'
        sx={{
          color:'white',
          backGroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={isSaving}
        >
          <AddOutlined sx={{ fontSize: 30}}/>
      </IconButton>
    </JournalLayout>

  )
}
