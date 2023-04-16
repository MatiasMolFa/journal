import React, {useMemo, useState} from 'react'
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingCountWithEmail } from '../../store/auth/thunks'
import 'animate.css'

const formDefaultData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener un @.'],
  password: [ (value) => value.length >= 6, 'El password debe de tener al menos 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth)
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const [formSubmited, setformSubmited] = useState(false)

  const { 
          formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid 
        } = useForm(formDefaultData, formValidations);

  console.log(formState);

  const onSubmit = async(event) => {
    event.preventDefault()
    setformSubmited(true)
    if( !isFormValid ) return;
    if( !isCheckingAuthentication){
      dispatch(startCreatingCountWithEmail(formState))
    }
  }

  return (
    <AuthLayout title='Registro'>
      <form className='animate__animated animate__fadeIn' onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={ 12 } md={ 12 } sx={{ mt: 2}}>
            <TextField 
              label='Nombre Completo' 
              type='text' 
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              placeholder='Jhon Doe' 
              fullWidth
              error={ !!displayNameValid && formSubmited }
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 12 } sx={{ mt: 2}}>
            <TextField 
              label='Correo' 
              type='email' 
              name='email'
              value={email}
              onChange={onInputChange}
              placeholder='test@gmail.com' 
              fullWidth
              error= { !!emailValid && formSubmited}
              helperText= { emailValid }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 12} sx={{ mt: 2}}>
            <TextField 
              label='Contraseña' 
              type='password' 
              name='password'
              value={password}
              onChange={onInputChange}
              placeholder='contraseña' 
              fullWidth
              error= { !!passwordValid && formSubmited }
              helperText= { passwordValid }
            />
          </Grid>
          {!!errorMessage && 
            <Grid container spacing={2} sx={{ mb:2 , mt: 2}}>
              <Grid item xs={12}>
                <Alert severity="error"> {errorMessage} </Alert>
              </Grid>
            </Grid>
          }
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 2}}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button variant='contained' type='submit' fullWidth disabled={ isCheckingAuthentication }>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography> ¿Ya tienes cuenta?  </Typography>
            <Link component={RouterLink} to="/auth/login" sx={{ ml: 1}}>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
