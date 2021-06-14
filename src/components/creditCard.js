import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Container, Button } from '@material-ui/core';
import './style/creditCard.scss';
import Modal from './modal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '75ch',
    },
  },

  container: {
    marginBottom: '200px',
  },
  button: {
    width: '150px',
    marginLeft: '15px'
  }
}));

export default function CreditCard() {
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const classes = useStyles();

  const toggleSubmit = () => {
    setOrderSubmitted(true)
  }

  return (
    <section>
    {orderSubmitted ? <Modal innerText="Thanks for you order! You should receive an email notification shortly that confirms your order was received!"></Modal>
    : null }
    <Container className={classes.container}>
      <form className={classes.root} Validate autoComplete="on">
      <h1>Billing Info</h1>
      <TextField id="filled-basic" label="Name" variant="filled"/>
      <TextField id="filled-basic" label="Address" variant="filled"/>
      <TextField id="filled-basic" label="City" variant="filled"/>
      <TextField id="filled-basic" label="State" variant="filled"/>
      <TextField id="filled-basic" label="Zip" variant="filled"/>
      <TextField id="filled-basic" label="Phone" variant="filled"/>
      </form >
      <form className={classes.root} Validate autoComplete="on">
      <h1>Payment Info</h1>
      <TextField id="filled-basic" label="Credit Card Number" variant="filled"/>
      <TextField id="filled-basic" type='date' InputLabelProps={{
            shrink: true,
          }}label="Expiration Date" variant="filled"/>
      <TextField id="filled-basic" label="CCV" variant="filled"/>

      </form>
      <Button  className={classes.button} onClick={toggleSubmit}variant="contained"  color="primary">Place Order</Button>

    </Container>
    </section>
  )

}