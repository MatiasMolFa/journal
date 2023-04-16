import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//Proveedor que seleccione en firebase, en este caso solo google
const googleAuthProvider = new GoogleAuthProvider()


export const singInWithGoogle = async() => {

    try{
        const result = await signInWithPopup(FirebaseAuth, googleAuthProvider)
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }

    }catch ( error ) {
        const errorCode = error.code
        const errorMessage = error.message
        //const email = error.customData.email
        //const credential = GoogleAuthProvider.credentialFromError(error)
        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const registerWithEmail = async({email, password, displayName}) => {
    try{
       const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
       const { uid, photoURL } = resp.user
       console.log(uid, photoURL, displayName)

       await updateProfile(FirebaseAuth.currentUser, { displayName })

       return {
            ok: true,
            email, displayName, uid, photoURL
       }
    }catch(error){
        if( error.message.includes('email-already-in-use')) return { ok: false , errorMessage: 'El correo ya se encuentra en uso.'}
        return { ok: false, errorMessage: error.message}
    }
}

export const loginWithEmail = async( {email, password }) => {
    try{
        const { uid, photoURL, displayName } = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        return {
            ok: true,
            email, uid, photoURL, displayName
        }
    }catch(error){
        if( error.message.includes('wrong-password') || error.message.includes('user-not-found')) return { ok: false , errorMessage: 'Error al iniciar sesion.'}
        else if ( error.message.includes('too-many-requests')) return { ok: false , errorMessage: 'Se ha bloqueado la cuenta por su seguridad.'}
        return { ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut()
}