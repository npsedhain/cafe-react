import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';

import Button from '../../commons/Button';

import MenuItem from './MenuItem';
import AddMenuItem from './AddMenuItem';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '85vw'
  },
  container: {
    marginTop: theme.spacing(4)
  },
  cardsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  menu: {
    color: theme.palette.text.primary
  }
}));

const GET_MENU_ITEMS = gql`
  {
    allMenuItems {
      _id
      type
      name
      price
      photo
    }
  }
`;

export default function MenuHome() {
  const classes = useStyles();

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const openAddDialog = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const { loading, error, data, refetch } = useQuery(GET_MENU_ITEMS);

  return (
    <Container maxWidth='xl' className={classes.main}>
      <Grid container justify='space-between' className={classes.container}>
        <Grid item>
          <Typography variant='h5' className={classes.menu}>
            Menu
          </Typography>
        </Grid>
        <Grid item>
          <Button testId='add-button' onClick={openAddDialog}>
            Add Menu Item
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} className={classes.cardsContainer}>
        {data &&
          data.allMenuItems.map((item, index) => (
            <Grid key={index} item>
              <MenuItem
                _id={item._id}
                type={item.type}
                name={item.name}
                price={item.price}
                photo={item.photo}
                refetch={refetch}
              />
            </Grid>
          ))}

        {loading && <>Loading...</>}

        {error && <>Error occurred while fetching.</>}
      </Grid>
      <AddMenuItem open={isDialogOpen} handleClose={handleDialogClose} refetch={refetch} />
    </Container>
  );
}
