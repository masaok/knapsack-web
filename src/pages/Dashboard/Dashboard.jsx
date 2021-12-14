// import { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

import { Helmet } from 'react-helmet-async'

import Typography from '@mui/material/Typography'

import KnapsackDynamic from './content/KnapsackDynamic/KnapsackDynamic'

import { Routes, Route } from 'react-router-dom'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      height: '100vh',
    },

    header: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },

    pageTitle: {
      color: 'white',
      fontSize: 40,
      fontFamily: ['Carter One', 'sans-serif'].join(','),
      textShadow: '3px 3px 4px #000',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    body: {
      display: 'flex',
    },

    sidebar: {
      display: 'flex',
      flexDirection: 'column',
    },

    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },

    // Logo
    logoContainer: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 160,
    },

    logo: {
      width: '100%',
      height: 'auto',
    },
  }),
  { name: 'Dashboard' }
)

const Dashboard = props => {
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Knapsack Visualizer</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Carter+One&amp;display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <div className={classes.header}>
        <Typography variant="h2" className={classes.pageTitle}>
          Knapsack Visualizer
        </Typography>
      </div>
      <div className={classes.body}>
        <div className={classes.sidebar}></div>
        <div className={classes.content}>
          <Routes>
            <Route path="*" element={<KnapsackDynamic />} />
            {/* <Route path="*" element={<KnapsackRecursion />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
