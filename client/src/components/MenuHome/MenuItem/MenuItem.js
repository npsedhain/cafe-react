import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400
  },
  paper: {
    height: 250,
    width: 450,
    backgroundColor: theme.palette.secondary.main
  },
  paper2: {
    height: 100,
    width: 450,
    backgroundColor: theme.palette.surface
  },
  cardTextContainer: {
    padding: theme.spacing(3)
  }
}));

export default function MenuItem({ name, price, type }) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} />
      <Paper className={classes.paper2}>
        <Grid container className={classes.cardTextContainer} justify='space-between'>
          <Grid item>
            <Typography variant='h6' color='textSecondary'>
              {type}
            </Typography>
            <Typography variant='h5' color='textPrimary'>
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='textSecondary'>
              ${price}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
