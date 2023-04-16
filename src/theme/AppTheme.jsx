import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { purpleTheme } from '../theme/index'

export const AppTheme = ( { children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
