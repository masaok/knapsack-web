import './App.css'

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import { makeStyles, ThemeProvider } from '@mui/styles'

import CssBaseline from '@mui/material/CssBaseline'

import { Helmet, HelmetProvider } from 'react-helmet-async'

import Dashboard from './pages/Dashboard/Dashboard'

import theme from './themes/default'

const useStyles = makeStyles(
  theme => ({
    root: {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%', // Prevent unwanted horizontal scroll: https://stackoverflow.com/a/23367686/11903320
      padding: 0,
      margin: 0,
      background: '#121212',
    },
  }),
  {
    name: 'App',
  }
)

const App = props => {
  const classes = useStyles(props)

  return (
    <HelmetProvider>
      <CssBaseline />
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <Routes>
              <Route path="//*" element={<Dashboard />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
