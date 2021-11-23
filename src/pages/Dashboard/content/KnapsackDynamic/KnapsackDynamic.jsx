import { useState, useCallback, useEffect } from 'react'
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

const tableDump = table => {
  console.log(JSON.stringify(table, null, 2))
}

// const NUM_ITEMS = VALUES.length

const table = [[]]

const KnapsackDynamic = props => {
  const classes = useStyles(props)

  const [seconds, setSeconds] = useState(0)
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)

  // const [maxRow] = useState(NUM_ITEMS)
  // const [maxCol] = useState(MAX_WEIGHT)

  const [maxRow] = useState(1) // dev mode
  const [maxCol] = useState(2) // dev mode

  // const [table, setTable] = useState(new Array(NUM_ITEMS + 1))

  const timer = useCallback(() => {
    console.log(`S: ${seconds}, ROW: ${row}, COL: ${col}`)
    tableDump(table)
    if (col < maxCol) {
      console.log(`CREATING NEW COL AT ROW ${row} AND COL ${col}`)

      if (row === 0 || col === 0) {
        // table[row].push(`ROW ${row} COL ${col}`)
        table[row].push(0)
      } else if (WEIGHTS[row - 1] <= col) {
        table[row].push(
          max(VALUES[row - 1] + table[row - 1][col - WEIGHTS[row - 1]], table[row - 1][col])
        )
      } else {
        table[row].push(table[row - 1][col])
      }

      setCol(col + 1)
      setSeconds(seconds + 1)

      // console.log(table)
    } else if (row < maxRow) {
      // table[row] = new Array(MAX_WEIGHT + 1)
      // setTable(table => {
      //   table[row] = new Array(MAX_WEIGHT + 1)
      //   return table
      // })

      console.log(`CREATING NEW ROW AT ${row}`)
      table.push([])
      setRow(row + 1)
      setCol(0)
      setSeconds(seconds + 1)
    }

    // If neither condition is true, the state doesn't change, which doesn't
    // recreate the timer, which doesn't trigger the useEffect. The loop
    // will stop.
  }, [maxCol, maxRow, seconds, row, col])

  useEffect(() => {
    const timeout = setTimeout(timer, 1000)

    // Make sure to clear the current timeout whenever a new timer is generated.
    // This ensures that only one timeout is active at a time.
    return () => clearTimeout(timeout)
  }, [timer])

  // Returns the maximum value that can
  // be put in a knapsack of capacity maxWeight
  // const knapsack = (maxWeight, weights, values, numItems, depth = 0) => {
  //   let i, w
  //   let table = new Array(numItems + 1)

  //   // Build table table[][] in bottom up manner
  //   for (i = 0; i <= numItems; i++) {
  //     table[i] = new Array(maxWeight + 1)
  //     for (w = 0; w <= maxWeight; w++) {
  //       if (i === 0 || w === 0) table[i][w] = 0
  //       else if (weights[i - 1] <= w)
  //         table[i][w] = max(values[i - 1] + table[i - 1][w - weights[i - 1]], table[i - 1][w])
  //       else table[i][w] = table[i - 1][w]
  //     }
  //   }

  //   console.log(table)

  //   return table[numItems][maxWeight]
  // }

  console.log('STARTING HERE:')
  dump(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length, 0)

  console.log('RETURNING:')
  return (
    <div className={classes.root}>
      DYNAMIC VIS HERE:
      {/* {knapsack(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length)} */}
    </div>
  )
}

export default KnapsackDynamic
