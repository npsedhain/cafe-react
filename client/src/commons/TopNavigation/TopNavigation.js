import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.text.primary
  },
  title: {
    textTransform: 'uppercase',
    color: '#43425D'
  }
}));

function TopNavigation() {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Cafe React
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopNavigation;
