import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name:'journal',
    initialState:{
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        newNoteAdded:(state) => {
            state.messageSaved = 'Se añadio correctamente una nueva nota'
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSaved = ''
        },
        setNotes: (state, action) => {
            state.isSaving = false
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        updatedNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map( note => {
                if ( note.id === action.payload.id){
                    return action.payload
                }
                return note
            })
            state.messageSaved = 'Ha sido actualizada correctamente.'
        },
        deleteNoteById: (state, action) => {
            state.active = null
            state.notes = state.notes.filter( note => note.id !== action.payload)
        },
        setPicsToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false
        },
        logoutJournalProfile: (state) => {
            state.isSaving = false,
            state.messageSaved = '',
            state.notes = [],
            state.active = null
        }
    }
})

export const 
{ 
    addNewEmptyNote, 
    deleteNoteById,
    logoutJournalProfile,
    newNoteAdded,
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPicsToActiveNote,
    setSaving, 
    updatedNote
} = journalSlice.actions
