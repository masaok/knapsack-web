import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },
  }),
  { name: 'RecentGifs' }
)

const EmptyContent = props => {
  const classes = useStyles(props)

  return <div className={classes.root}>EMPTY CONTENT</div>
}

export default EmptyContent
