// import { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

import { Helmet } from 'react-helmet-async'

import KnapsackDynamic from './content/KnapsackDynamic/KnapsackDynamic'
// import KnapsackRecursion from './content/KnapsackRecursion/KnapsackRecursion'

import { Routes, Route } from 'react-router-dom'

// import logoTrans from '../../assets/images/placeholder-logo.png'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'pink',
      height: '100vh',
    },

    header: {
      display: 'flex',
      justifyContent: 'center',
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
      </Helmet>
      <div className={classes.header}>
        {/* <div className={classes.logoContainer}>
          <img className={classes.logo} src={logoTrans} alt="knapsack visualizer logo" />
        </div> */}
        Knapsack Visualizer
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
