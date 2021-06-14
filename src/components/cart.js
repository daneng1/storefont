import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  return (
    <div>
    <div className='cart-section'>
      <section >
        {products.cartCount > 0 ?
          <p className='cart-counter'>{products.cartCount}</p>
          : ''}
        <img className='cart-icon' src={cart} alt='cart' />

      </section>
      <section className='item-section'>
        {products.items.map((item, idx) => {
          return (
            <section key={idx} className='cart-item'>
              <img src={item.image} alt={item.name}></img>
              <h5>{item.name}</h5>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <IconButton aria-label="delete" onClick={() => props.deleteItem(item, idx)}>
                <DeleteIcon />
              </IconButton>

            </section>
          )
        })}
        <Button onClick={props.resetCart} className={classes.button} variant='contained' size="small" color="primary">Reset Cart</Button>
        <Link
          to='/checkout'
          style={{ textDecoration: "none"}}>
        <Button className={classes.button} variant='contained' size="small" color="primary">Checkout</Button>
        </Link>
      </section>
    </div>
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
