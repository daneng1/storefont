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
  activeItem: state.productReducer.activeItem
})

const mapDispatchToProps = dispatch => ({
  getRemoteData: () => dispatch(getRemoteData()),
  getRemoteCategory: () => dispatch(getRemoteCategory())
});

export default connect(mapStateToProps, mapDispatchToProps
)(Main);