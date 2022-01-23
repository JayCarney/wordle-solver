import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})}>
    <CssBaseline/>
    <Component {...pageProps} />
    </ThemeProvider>
}

export default MyApp
