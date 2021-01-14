import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  danger: {
    backgroundColor: theme.palette.danger,
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: theme.palette.danger
    }
  }
}));

function CRButton({ onClick, danger, children, disbaled, testId }) {
  const classes = useStyles();

  return (
    <Button
      data-testid={testId}
      disabled={disbaled}
      className={danger ? classes.danger : classes.button}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CRButton;
