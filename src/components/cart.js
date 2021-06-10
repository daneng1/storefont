import React from 'react';
import { connect } from 'react-redux';
import { deleteItem, resetCart } from '../store/cart.js';
import './style/cart.scss';
import cart from './assets/cart.png';
import IconButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Cart = props => {
  const classes = useStyles();
  let products = props.cartReducer;
  // console.log(products.cartCount);
  return (
    <div className='cart-section'>
      <section >
        {products.cartCount > 0 ?
          <p className='cart-counter'>{products.cartCount}</p>
          : ''}
        <img className='cart-icon' src={cart} alt='cart' />

      </section>
      <section>
        {products.items.map(item => {
          // console.log(item);
          return (
            <section className='cart-item'>
              <h5>{item.name}</h5>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <IconButton aria-label="delete" onClick={() => props.deleteItem(item)}>
                <DeleteIcon />
              </IconButton>

            </section>
          )
        })}
        <Button onClick={props.resetCart} className={classes.button} variant='contained' size="small" color="primary">Reset Cart</Button>
      </section>
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  deleteItem: (item) => dispatch(deleteItem(item)),
  resetCart: () => dispatch(resetCart())
});

const mapStateToProps = state => ({
  cartReducer: state.cartReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
