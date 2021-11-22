import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },
  }),
  { name: 'KnapsackDynamic' }
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

const KnapsackDynamic = props => {
  const classes = useStyles(props)

  // Returns the maximum value that can
  // be put in a knapsack of capacity maxWeight
  const knapsack = (maxWeight, weights, values, numItems, depth = 0) => {
    let i, w
    let table = new Array(numItems + 1)

    // Build table table[][] in bottom up manner
    for (i = 0; i <= numItems; i++) {
      table[i] = new Array(maxWeight + 1)
      for (w = 0; w <= maxWeight; w++) {
        if (i === 0 || w === 0) table[i][w] = 0
        else if (weights[i - 1] <= w)
          table[i][w] = max(values[i - 1] + table[i - 1][w - weights[i - 1]], table[i - 1][w])
        else table[i][w] = table[i - 1][w]
      }
    }

    console.log(table)

    return table[numItems][maxWeight]
  }

  console.log('STARTING HERE:')
  dump(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length, 0)

  console.log('RETURNING:')
  return (
    <div className={classes.root}>
      DYNAMIC VIS HERE: {knapsack(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length)}
    </div>
  )
}

export default KnapsackDynamic
