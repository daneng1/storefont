import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header.js';
import Footer from './footer.js';
import Products from './products.js';
import Checkout from './checkout.js';
import Categories from './categories.js';
import Cart from './cart.js';
import ProductDetails from './product-detail.js';
import { getRemoteCategory } from '../store/categories.js';
import { getRemoteData } from '../store/products.js';
import LearnMore from './learnMore.js';
import './style/app.scss';

function Main(props) {

  const fetchData = () => {
    props.getRemoteData();
    props.getRemoteCategory();
  };
  function Data () {
    useEffect(() => {
      fetchData();
    }, []);

  }
  Data();
  
  return (
    <>
      <Header />
      <Cart />
      <Switch>
        <Route exact path="/">
          <Categories />
          <Products />
          {props.activeCat === 'all' ? 
          <>
            <img className='landing-image' src='https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' alt='couple in kitchen'/> 
            <LearnMore />
          </>
          : null
          }
        </Route>
        {props.activeItem !== null ?
          <Route exact path={`/details`}
            component={(props) => <ProductDetails {...props} />}
          >

          </Route>
          : null}
        <Route exact path="/checkout">
          <Checkout />
        </Route>

      </Switch>
      <Footer />

    </>
  )
}
const mapStateToProps = state => ({
  activeItem: state.productReducer.activeItem,
  activeCat: state.categoryReducer.active
})

const mapDispatchToProps = dispatch => ({
  getRemoteData: () => dispatch(getRemoteData()),
  getRemoteCategory: () => dispatch(getRemoteCategory())
});

export default connect(mapStateToProps, mapDispatchToProps
)(Main);