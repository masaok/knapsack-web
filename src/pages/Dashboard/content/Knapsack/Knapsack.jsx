import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },
  }),
  { name: 'Knapsack' }
)

const VALUES = [60, 100, 120]
const WEIGHTS = [10, 20, 30]
const MAX_WEIGHT = 50

/* A Naive recursive implementation of
    0-1 Knapsack problem */

// A utility function that returns
// maximum of two integers
const max = (a, b) => {
  return a > b ? a : b
}

// Returns the maximum value that can
// be put in a knapsack of capacity W
const knapsack = (W, wt, val, n) => {
  // Base Case
  if (n == 0 || W == 0) return 0

  // If weight of the nth item is
  // more than Knapsack capacity W,
  // then this item cannot be
  // included in the optimal solution
  if (wt[n - 1] > W) return knapsack(W, wt, val, n - 1)
  // Return the maximum of two cases:
  // (1) nth item included
  // (2) not included
  else return max(val[n - 1] + knapsack(W - wt[n - 1], wt, val, n - 1), knapsack(W, wt, val, n - 1))
}

const Knapsack = props => {
  const classes = useStyles(props)

  return <div className={classes.root}>KNAPSACK VISUALIZATION HERE</div>
}

export default Knapsack
