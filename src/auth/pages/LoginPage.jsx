import React, { useMemo } from 'react'
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startLoginWithEmail, startGoogleSignInt } from '../../store/auth/thunks';
import 'animate.css'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth)
  const isAuth = useMemo( () => status === 'checking', [status])

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm(formData)

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch(startLoginWithEmail({email, password}))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignInt())
  }

  return (
    <AuthLayout title="Login">
      <form className='animate__animated animate__fadeIn' onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={ onInputChange }
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={ onInputChange }
            />
          </Grid>
          {!!errorMessage && 
            <Grid container spacing={2} sx={{ mb:2 , mt: 2}}>
              <Grid item xs={12}>
                <Alert severity="error"> {errorMessage} </Alert>
              </Grid>
            </Grid>
          }
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button type='submit' variant="contained" fullWidth disabled={isAuth}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant="contained" fullWidth disabled={isAuth}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
