import { checkingCredential, login, logout } from './authSlice'
import { loginWithEmail, logoutFirebase, registerWithEmail, singInWithGoogle } from '../../firebase/providers'
import { logoutJournalProfile } from '../journal/journalSlice';

export const checkingAuthentication = ( {email, password}) => {
    console.log(email + ' ' + password);
    return async( dispatch ) => {
        dispatch(checkingCredential())
    }
}

export const startGoogleSignInt = () => {
    return async( dispatch ) => {
        dispatch(checkingCredential())
        const result = await singInWithGoogle()
        if ( !result.ok ) dispatch( logout())
        dispatch(login(result))
    }
}

export const startCreatingCountWithEmail = ( {email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch(checkingCredential())
        const { ok , uid, photoURL, errorMessage } = await registerWithEmail({email,password,displayName})
        if( !ok ) return dispatch( logout({errorMessage}))
        dispatch(login({ uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmail = ({email, password }) => {
    return async( dispatch ) => {
        dispatch(checkingCredential())
        const { ok, uid, photoURL, displayName, errorMessage} = await loginWithEmail({email,password})
        console.log(errorMessage)
        if( !ok ) return dispatch( logout({errorMessage}))
        dispatch(login({ uid, displayName, email, photoURL}))
    }
}

export const startLogout = () => {
    return async(dispatch) =>{
        await logoutFirebase()

        dispatch(logoutJournalProfile({}))
        dispatch(logout({}))
    }
}