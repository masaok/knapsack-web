// import { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

import { Helmet, HelmetProvider } from 'react-helmet-async'

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

    // Header
    header: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },

    pageTitle: {
      color: 'gold',
      fontSize: 60,
      fontFamily: ['Carter One', 'sans-serif'].join(','),
      textShadow: '3px 3px 4px #000',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    description: {
      marginTop: theme.spacing(3),
      maxWidth: theme.spacing(70),
    },

    // Main Content
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
    <HelmetProvider>
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
          <Typography variant="h2">
            <span className={classes.pageTitle}>Knapsack Visualizer</span>
          </Typography>
          <div className={classes.description}>
            <b>
              The problem: fill a knapsack with the highest possible value items given a weight
              limit.
            </b>
            &nbsp; Given a list of items with corresponding values and weights, this algorithm will
            find the maximum value possible given the maximum weight constraint. Currently, each
            item can be used only once (no repeats).
          </div>
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
    </HelmetProvider>
  )
}

export default Dashboard
