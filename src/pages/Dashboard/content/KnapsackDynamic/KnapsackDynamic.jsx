import { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

import clsx from 'clsx'

import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

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
      flexDirection: 'column',
      alignItems: 'center',
    },

    // Top Area
    topArea: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      // backgroundColor: 'lightblue',
    },

    textField: {
      paddingBottom: theme.spacing(1),
    },

    infoArea: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'lightgreen',
      // flexDirection: 'column',
      margin: theme.spacing(1),
    },

    tableArea: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'lavender',
      margin: theme.spacing(1),
    },

    displayArea: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'yellow',
      // width: '100%',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },

    // Smaller Areas
    info: {
      display: 'flex',
      flexDirection: 'column',
    },

    table: {
      display: 'flex',
      flex: 1,
      margin: theme.spacing(1),
    },

    unit: {
      display: 'flex',
      flex: 1,
    },

    // Colors
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

    // Legend
    legendHeader: {
      fontWeight: 'bold',
    },

    legendValue: {
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
    },

    // Fields
    inputs: {
      display: 'flex',
      flex: 1,
      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    fields: {
      margin: theme.spacing(1),
    },

    updateButton: {
      justifyContent: 'center',
    },

    // Errors
    errors: {
      backgroundColor: 'red',
    },

    error: {
      color: 'red',
    },

    // Footer
    footer: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
  }),
  { name: 'KnapsackDynamic' }
)

// const VALUES = [60, 100, 120]
// const WEIGHTS = [10, 20, 30]
// const MAX_WEIGHT = 50
// const MAX_WEIGHT = 2

// Minimal
// const VALUES = [6, 10]
// const WEIGHTS = [1, 2]
// const MAX_WEIGHT = 1

// Dev
// const VALUES = [6, 10, 12]
// const WEIGHTS = [1, 2, 3]
// const MAX_WEIGHT = 2

// Geeks example
// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
const VALUES = [10, 15, 40]
const WEIGHTS = [1, 2, 3]
const MAX_WEIGHT = 6

// Educative example (fruit)
// https://www.educative.io/edpresso/what-is-the-knapsack-problem
// const VALUES = [4, 5, 3, 7]
// const WEIGHTS = [2, 3, 1, 4]
// const MAX_WEIGHT = 5

const NUM_ITEMS = VALUES.length
const MS = 100

// A utility function that returns
// maximum of two integers
const max = (a, b) => {
  return a > b ? a : b
}

// const tableDump = table => {
//   console.log(JSON.stringify(table, null, 2))
// }

// Legend
const legend = [
  { className: 'latest', meaning: 'Latest Maximum Value Possible' },
  { className: 'source', meaning: 'Previous Best Answer' },
  { className: 'sum', meaning: 'Summed Answer' },
]

const KnapsackDynamic = props => {
  const classes = useStyles(props)

  const [table, setTable] = useState([[]])

  const [ticks, setTicks] = useState(0)
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)

  // Fields as typed in raw string form (before validation)
  const [weightsInput, setWeightsInput] = useState(WEIGHTS.join(','))
  const [valuesInput, setValuesInput] = useState(VALUES.join(','))
  const [maxWeightInput, setMaxWeightInput] = useState(MAX_WEIGHT)
  const [msInput, setMsInput] = useState(MS)

  // Fields used in algorithm
  const [weights, setWeights] = useState(WEIGHTS)
  const [values, setValues] = useState(VALUES)
  const [maxWeight, setMaxWeight] = useState(MAX_WEIGHT)

  const [maxRow, setMaxRow] = useState(NUM_ITEMS)
  const [maxCol, setMaxCol] = useState(MAX_WEIGHT)

  const [sourceRow, setSourceRow] = useState(null)
  const [sourceCol, setSourceCol] = useState(null)

  const [sumRow, setSumRow] = useState(null)
  const [sumCol, setSumCol] = useState(null)

  const [addendValueIndex, setAddendValueIndex] = useState(null)

  const [ms, setMs] = useState(MS)

  const [errors, setErrors] = useState([])

  // Validation Effect
  useEffect(() => {
    const newErrors = []
    const newWeights = weightsInput.split(',')
    const newValues = valuesInput.split(',')

    if (newWeights.length !== newValues.length) {
      newErrors.push('Number of weights and values must be equal.')
    }

    newValues.forEach(item => {
      if (isNaN(item)) {
        newErrors.push(`Value "${item}" is not a number`)
      }
    })

    newWeights.forEach(item => {
      if (isNaN(item)) {
        newErrors.push(`Weight "${item}" is not a number`)
      }
    })

    if (isNaN(maxWeightInput)) {
      newErrors.push('Max weight invalid.')
    }

    if (isNaN(msInput)) {
      newErrors.push('Milliseconds invalid.')
    }

    setErrors([...newErrors])
  }, [weightsInput, valuesInput, maxWeightInput, msInput])

  const timer = useCallback(() => {
    // If the current column is <= the max column (max weight)
    if (col <= maxCol) {
      // console.log(`ROW ${row} COL ${col} (NEW COL)`)
      // console.log(`CREATING NEW COL AT ROW ${row} AND COL ${col}`)

      // Reset all highlights
      setAddendValueIndex(null)
      setSumRow(null)
      setSumCol(null)
      setSourceRow(null)
      setSourceCol(null)

      // console.log('TIMER CALLBACK:')
      // console.log(`WEIGHTS:` + JSON.stringify(weights, null, 2))
      // console.log(`VALUES:` + JSON.stringify(values, null, 2))
      // console.log(`MAX WEIGHT: ${maxWeight}`)

      if (row === 0 || col === 0) {
        // console.log(`ROW or COL are either ZERO, so push ZERO`)
        // table[row].push(`ROW ${row} COL ${col}`)
        table[row].push(0)
      } else if (weights[row - 1] <= col) {
        // console.log(`PREV ROW WEIGHT <= COL ${col}`)

        // console.log('VALUES:')
        // console.log(JSON.stringify(values, null, 2))

        const sumA = values[row - 1]
        // console.log(`NEW VAL SUM A ${sumA}`)
        setAddendValueIndex(row - 1)

        const sumB = table[row - 1][col - weights[row - 1]]
        // console.log(`NEW VAL SUM B ${sumB}`)
        setSumRow(row - 1)
        setSumCol(col - weights[row - 1])

        // const newVal = values[row - 1] + table[row - 1][col - weights[row - 1]]
        const newVal = sumA + sumB
        // console.log(`NEW VAL ${newVal}`)

        const prevRowVal = table[row - 1][col]
        // console.log(`PREV ROW VAL ${prevRowVal}`)
        setSourceRow(row - 1)
        setSourceCol(col)

        const newMax = max(
          // values[row - 1] + table[row - 1][col - weights[row - 1]],
          newVal,
          // table[row - 1][col]
          prevRowVal
        )
        // console.log(`NEW MAX ${newMax}`)
        table[row].push(newMax)
        // tableDump(table)
      } else {
        // Get the value from the previous row
        const prevRowVal = table[row - 1][col]
        // console.log(`NO COMP, PREV ROW VAL ${prevRowVal}`)
        table[row].push(prevRowVal)

        setSourceRow(row - 1)
        setSourceCol(col)

        // tableDump(table)
      }

      setCol(col + 1)
      setTicks(ticks + 1)

      // console.log(table)
    } else if (row < maxRow) {
      // console.log(`ROW ${row} COL ${col} (NEW ROW)`)
      // console.log(`CREATING NEW ROW AT ${row}`)
      table.push([])
      // tableDump(table)
      setRow(row + 1)
      setCol(0)
      setTicks(ticks + 1)
    }

    // If neither condition is true, the state doesn't change, which doesn't
    // recreate the timer, which doesn't trigger the useEffect. The loop
    // will stop.
  }, [maxCol, maxRow, ticks, row, col, table, values, weights])

  useEffect(() => {
    const timeout = setTimeout(timer, ms)

    // Make sure to clear the current timeout whenever a new timer is generated.
    // This ensures that only one timeout is active at a time.
    return () => clearTimeout(timeout)
  }, [timer, ms])

  const handleFieldChange = event => {
    console.log(event.target.name)
    console.log(event.target.value)

    switch (event.target.name) {
      case 'weights':
        setWeightsInput(event.target.value)
        break
      case 'values':
        setValuesInput(event.target.value)
        break
      case 'maxWeight':
        setMaxWeightInput(event.target.value)
        break
      case 'ms':
        setMsInput(event.target.value)
        break
      default:
    }
  }

  const handleUpdate = () => {
    if (errors.length === 0) {
      const newWeights = weightsInput.split(',').map(Number)
      const newValues = valuesInput.split(',').map(Number)

      setWeights([...newWeights])
      setValues([...newValues])
      setMaxWeight(parseInt(maxWeightInput))
      setMs(parseInt(msInput))

      // TODO: Fix this redundancy
      setMaxCol(parseInt(maxWeightInput))
      setMaxRow(newValues.length)

      // Reset the animation
      setTable([[]])
      setRow(0)
      setCol(0)
      setTicks(0)
    }
  }

  // console.log('FIELDS:')
  // console.log(fields)

  // console.log('TABLE:')
  // console.log(table)

  return (
    <div className={classes.root}>
      <div className={classes.topArea}>
        <div className={classes.inputs}>
          <div>
            <div className={clsx(classes.fields, classes.textField)}>
              <TextField
                name="weights"
                label="Weights"
                size="small"
                value={weightsInput}
                onChange={handleFieldChange}
              />
            </div>
            <div className={classes.fields}>
              <TextField
                name="values"
                label="Values"
                size="small"
                value={valuesInput}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div>
            <div className={clsx(classes.fields, classes.textField)}>
              <TextField
                name="maxWeight"
                label="Max Weight"
                size="small"
                value={maxWeightInput}
                onChange={handleFieldChange}
              />
            </div>
            <div className={classes.fields}>
              <TextField
                name="ms"
                label="Milliseconds per tick"
                size="small"
                value={msInput}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>
        <div className={clsx(classes.fields, classes.updateButton)}>
          <Button variant="contained" onClick={handleUpdate} disabled={errors.length > 0}>
            Update
          </Button>
        </div>
      </div>

      <div
        // className={classes.errors}
        classes={{
          root: classes.errors,
          rounded: classes.errors,
          outline: classes.errors,
        }}
        // style={{
        //   backgroundColor: 'blue',
        // }}
      >
        {errors.map(item => {
          return <div className={classes.error}>{item}</div>
        })}
      </div>

      <div className={classes.infoArea}>
        <div className={classes.table}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell scope="row" align="center">
                    Ticks
                  </TableCell>
                  <TableCell scope="row" align="center">
                    {ticks}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell scope="row" align="center">
                    Milliseconds per tick
                  </TableCell>
                  <TableCell scope="row" align="center">
                    {ms}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell scope="row" align="center">
                    Max Weight
                  </TableCell>
                  <TableCell scope="row" align="center">
                    {maxWeight}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={classes.table}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <span className={classes.legendHeader}>Color Legend</span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {legend.map((item, index) => {
                  const { className, meaning } = item
                  return (
                    <TableRow key={index}>
                      <TableCell className={classes[className]} scope="row" align="center">
                        <span className={classes.legendValue}>{meaning}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className={classes.tableArea}>
        {/* Left Table List of Weights and Values */}
        <div className={classes.table}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weights</TableCell>
                  <TableCell>Values</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((value, valueIndex) => {
                  return (
                    <TableRow key={valueIndex}>
                      <TableCell component="th" scope="row" align="center">
                        {weights[valueIndex]}
                      </TableCell>
                      <TableCell
                        className={valueIndex === addendValueIndex ? classes.sum : classes.empty}
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {value}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Main Table Output */}
        <div className={classes.table}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="knapsack table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Number of Items</TableCell>
                  {[...Array(maxWeight + 1).keys()].map((col, colIndex) => {
                    return (
                      <TableCell key={colIndex} align="center">
                        {colIndex}
                      </TableCell>
                    )
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
                    <TableCell component="th" scope="row" key={rowIndex} align="center">
                      {rowIndex}
                    </TableCell>
                    {trow.map((tcol, colIndex) => {
                      // console.log(`ROW ${row} COL ${col} TROWi ${rowIndex} TCOLi ${colIndex}`)

                      // console.log(
                      //   `ROW ${row} SROW ${sourceRow} RI ${rowIndex} COL ${col} SCOL ${sourceCol} CI ${colIndex}`
                      // )

                      // console.log(
                      //   `ROW ${row} SROW ${sumRow} RI ${rowIndex} COL ${col} SCOL ${sumCol} CI ${colIndex}`
                      // )
                      return (
                        <TableCell
                          key={colIndex}
                          className={clsx(
                            row === rowIndex && col === colIndex + 1
                              ? classes.latest
                              : classes.empty,
                            sourceRow === rowIndex && sourceCol === colIndex
                              ? classes.source
                              : classes.empty,
                            sumRow === rowIndex && sumCol === colIndex ? classes.sum : classes.empty
                          )}
                          align="center"
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
      </div>

      <footer className={classes.footer}>
        <Typography>
          Dynamic Algorithm Credit:&nbsp;
          <Link href="https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/" target="_blank">
            https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
          </Link>
        </Typography>
      </footer>
    </div>
  )
}

export default KnapsackDynamic
