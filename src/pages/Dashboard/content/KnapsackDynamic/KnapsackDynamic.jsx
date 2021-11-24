import { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

import clsx from 'clsx'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },

    info: {
      display: 'flex',
      flexDirection: 'column',
    },

    empty: {},

    latest: {
      backgroundColor: 'lightgreen',
    },

    source: {
      backgroundColor: 'lightblue',
    },

    sum: {
      backgroundColor: 'lavender',
    },
  }),
  { name: 'KnapsackDynamic' }
)

// const VALUES = [60, 100, 120]
// const WEIGHTS = [10, 20, 30]
// const MAX_WEIGHT = 50
// const MAX_WEIGHT = 2

// Dev
const VALUES = [6, 10, 12]
const WEIGHTS = [1, 2, 3]
const MAX_WEIGHT = 5

// Geeks example
// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
// const VALUES = [10, 15, 40]
// const WEIGHTS = [1, 2, 3]
// const MAX_WEIGHT = 6

const NUM_ITEMS = VALUES.length
const MS = 100

/* A Naive recursive implementation of 0-1 Knapsack problem
 * Credit: https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
 */

// A utility function that returns
// maximum of two integers
const max = (a, b) => {
  return a > b ? a : b
}

const tableDump = table => {
  console.log(JSON.stringify(table, null, 2))
}

const table = [[]]

const KnapsackDynamic = props => {
  const classes = useStyles(props)

  const [seconds, setSeconds] = useState(0)
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)

  const [maxRow] = useState(NUM_ITEMS)
  const [maxCol] = useState(MAX_WEIGHT)

  const [sourceRow, setSourceRow] = useState(0)
  const [sourceCol, setSourceCol] = useState(0)

  const [sumRow, setSumRow] = useState(0)
  const [sumCol, setSumCol] = useState(0)

  // const [maxRow] = useState(1) // dev mode
  // const [maxCol] = useState(2) // dev mode

  // const [table, setTable] = useState(new Array(NUM_ITEMS + 1))

  const timer = useCallback(() => {
    // console.log(`S ${seconds} ROW ${row} COL ${col}`)
    // tableDump(table)
    if (col <= maxCol) {
      console.log(`ROW ${row} COL ${col} (NEW COL)`)
      console.log(`CREATING NEW COL AT ROW ${row} AND COL ${col}`)

      if (row === 0 || col === 0) {
        console.log(`ROW or COL are either ZERO, so push ZERO`)
        // table[row].push(`ROW ${row} COL ${col}`)
        table[row].push(0)
      } else if (WEIGHTS[row - 1] <= col) {
        console.log(`PREV ROW WEIGHT <= COL ${col}`)

        console.log('VALUES:')
        console.log(JSON.stringify(VALUES, null, 2))

        const sumA = VALUES[row - 1]
        console.log(`NEW VAL SUM A ${sumA}`)

        const sumB = table[row - 1][col - WEIGHTS[row - 1]]
        console.log(`NEW VAL SUM B ${sumB}`)
        setSumRow(row - 1)
        setSumCol(col - WEIGHTS[row - 1])

        const newVal = VALUES[row - 1] + table[row - 1][col - WEIGHTS[row - 1]]
        console.log(`NEW VAL ${newVal}`)

        const prevRowVal = table[row - 1][col]
        console.log(`PREV ROW VAL ${prevRowVal}`)
        setSourceRow(row - 1)
        setSourceCol(col)

        const newMax = max(
          VALUES[row - 1] + table[row - 1][col - WEIGHTS[row - 1]],
          table[row - 1][col]
        )
        console.log(`NEW MAX ${newMax}`)
        table[row].push(newMax)
        tableDump(table)
      } else {
        const prevRowVal = table[row - 1][col]
        console.log(`NO COMP, PREV ROW VAL ${prevRowVal}`)
        table[row].push(table[row - 1][col])

        setSourceRow(row - 1)
        setSourceCol(col)

        tableDump(table)
      }

      setCol(col + 1)
      setSeconds(seconds + 1)

      // console.log(table)
    } else if (row < maxRow) {
      console.log(`ROW ${row} COL ${col} (NEW ROW)`)
      // table[row] = new Array(MAX_WEIGHT + 1)
      // setTable(table => {
      //   table[row] = new Array(MAX_WEIGHT + 1)
      //   return table
      // })

      console.log(`CREATING NEW ROW AT ${row}`)
      table.push([])
      tableDump(table)
      setRow(row + 1)
      setCol(0)
      setSeconds(seconds + 1)
    }

    // If neither condition is true, the state doesn't change, which doesn't
    // recreate the timer, which doesn't trigger the useEffect. The loop
    // will stop.
  }, [maxCol, maxRow, seconds, row, col])

  useEffect(() => {
    const timeout = setTimeout(timer, MS)

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

  // console.log('STARTING HERE:')
  // dump(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length, 0)

  // console.log('RETURNING:')
  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div>VALUES: {JSON.stringify(VALUES, null, 2)}</div>
        <div>WEIGHTS: {JSON.stringify(WEIGHTS, null, 2)}</div>
        <div>MAX WEIGHT: {MAX_WEIGHT}</div>
      </div>
      {/* {knapsack(MAX_WEIGHT, WEIGHTS, VALUES, VALUES.length)} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Number of Items</TableCell>
              {[...Array(MAX_WEIGHT + 1).keys()].map((col, colIndex) => {
                return <TableCell key={colIndex}>{colIndex}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((trow, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // className={classes.latest}
              >
                <TableCell component="th" scope="row" key={rowIndex}>
                  {rowIndex}
                </TableCell>
                {trow.map((tcol, colIndex) => {
                  // console.log(`ROW ${row} COL ${col} TROWi ${rowIndex} TCOLi ${colIndex}`)

                  // console.log(
                  //   `ROW ${row} SROW ${sourceRow} RI ${rowIndex} COL ${col} SCOL ${sourceCol} CI ${colIndex}`
                  // )

                  console.log(
                    `ROW ${row} SROW ${sumRow} RI ${rowIndex} COL ${col} SCOL ${sumCol} CI ${colIndex}`
                  )
                  return (
                    <TableCell
                      key={colIndex}
                      className={clsx(
                        row === rowIndex && col === colIndex + 1 ? classes.latest : classes.empty,
                        sourceRow === rowIndex && sourceCol === colIndex
                          ? classes.source
                          : classes.empty,
                        sumRow === rowIndex && sumCol === colIndex ? classes.sum : classes.empty
                      )}
                    >
                      {tcol}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default KnapsackDynamic
