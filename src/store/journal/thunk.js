import { collection,deleteDoc,doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updatedNote, newNoteAdded, setPicsToActiveNote } from './journalSlice';
import { loadNotes } from '../../helper/loadNotes';
import { postFileUpload } from '../../helper/fileUploader';
import { deleteNoteById } from './journalSlice';

export const startNewNote = () => {
    return async( dispatch, getState ) =>{
        dispatch(savingNewNote())
        const { uid } = getState().auth

        const newNote = {
            title: 'Nueva nota',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB,`${uid}/journal/notes`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id
        dispatch(addNewEmptyNote( newNote ))
        dispatch(setActiveNote( newNote))
        dispatch(newNoteAdded())
    }
}

export const startLoadingNotes = () => {
    return async( dispatch,getState ) =>{
        const { uid } = getState().auth
        if( !uid ) throw new Error('El UID del usuario no existe')
        const notes = await loadNotes( uid )
        dispatch(setNotes( notes ))
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) =>{
        dispatch( setSaving())
        const { uid } = getState().auth
        const { active:note } = getState().journal
        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true})
        dispatch( updatedNote( note ))
    }
}

export const startUploadingFiles = ( files = []) => {
    return async(dispatch) => {
        dispatch( setSaving() )
        const allFilesToUpload = []
        for( const file of files ){
            allFilesToUpload.push(postFileUpload(file))
        }
        const photosURLS = await Promise.all( allFilesToUpload)
        dispatch( setPicsToActiveNote(photosURLS))
    }
}

export const startDeleteNote = () => {
    return async(dispatch, getState) =>{
        const { uid } = getState().auth
        const { active:note, notes } = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        console.log(notes);
        console.log(notes.filter( x => x.id !== note.id))
        dispatch(deleteNoteById(note.id))
    }
}