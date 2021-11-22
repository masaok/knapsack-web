import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },
  }),
  { name: 'KnapsackRecursion' }
)

const VALUES = [60, 100, 120]
const WEIGHTS = [10, 20, 30]
const MAX_WEIGHT = 50

/* A Naive recursive implementation of 0-1 Knapsack problem
 * Credit: https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
 */

// A utility function that returns
// maximum of two integers
const max = (a, b) => {
  return a > b ? a : b
}

const dump = (maxWeight, weights, values, numItems, depth) => {
  console.log(`DEPTH: ${depth}, MAX: ${maxWeight}, NUM ITEMS: ${numItems}`)
  console.log('VALUES: ' + JSON.stringify(values))
  console.log('WEIGHTS:' + JSON.stringify(weights))
}

const KnapsackRecursion = props => {
  const classes = useStyles(props)

  // Returns the maximum value that can
  // be put in a knapsack of capacity maxWeight
  const knapsack = (maxWeight, weights, values, numItems, depth = 0) => {
    // Base Case
    if (numItems === 0 || maxWeight === 0) {
      console.log('BASE CASE HIT')
      dump(maxWeight, weights, values, numItems, depth)
      return 0
    }

    // If weight of the nth item is
    // more than Knapsack capacity maxWeight,
    // then this item cannot be
    // included in the optimal solution
    if (weights[numItems - 1] > maxWeight) {
      const lastItemWeight = weights[numItems - 1]
      console.log('LAST ITEM WEIGHT: ' + lastItemWeight)
      return knapsack(maxWeight, weights, values, numItems - 1, depth + 1)
    }
    // Return the maximum of two cases:
    // (1) nth item included
    // (2) not included
    else
      return max(
        values[numItems - 1] +
          knapsack(maxWeight - weights[numItems - 1], weights, values, numItems - 1, depth + 1),
        knapsack(maxWeight, weights, values, numItems - 1, depth + 1)
      )
  }

  console.log('STARTING HERE:')
  dump(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length, 0)

  console.log('RETURNING:')
  return (
    <div className={classes.root}>
      VIS HERE: {knapsack(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length)}
    </div>
  )
}

export default KnapsackRecursion
