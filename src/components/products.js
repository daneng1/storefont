import React, {  useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  productDetailPage } from '../store/products.js';
import { addItem } from '../store/cart.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './modal.js';
import './style/products.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'block',
    justifyContent: 'center',
    margin: '100px auto',
    width: 1200
  },
  media: {
    height: 400,
    width: 400,
  },
}));


const Products = props => {
  const [ itemExists, setItemExists ] = useState(false);

  const handleClick = ((item) => {
    setItemExists(false);
    let temp = false;
    if(props.cartReducer.cartCount === 0) return props.addItem(item);
    props.cartReducer.items.forEach((items) => {
      if (item._id === items._id) {
        setItemExists(true);
        temp = true;
      }
    })
    if(temp === false) props.addItem(item);
  });


  const classes = useStyles();
  let active = props.categoryReducer.active;

  return (
    <div className={classes.root}>
      {itemExists ? <Modal innerText="That Item is Already in Your Cart"></Modal>
      : null }
      
      {active !== null ? (

          <div className="product-list">
            {props.data.filter((item) => item.category === active && item.inventory > 0).map((item) => {
              return (

                  <Card  className='card'>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title={item.name}
                        component="img"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{item.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{item.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">In-stock: {item.inventory}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button onClick={() => handleClick(item)} size="small" color="primary">
                        Add to Cart
                        </Button>
                        <Link 
                        to={{ pathname: `/details`}}
                        style={{ textDecoration: "none"}}>
                      <Button onClick={() => props.productDetailPage(item)}size="small" color="primary" disabled={!props}>
                        More Details
                        </Button>
                        </Link>
                    </CardActions>
                  </Card>
              )
            })
            }
          </div>
        ) : ''}
    </div>
  )
}

const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
  productReducer: state.productReducer,
  cartReducer: state.cartReducer,
  filteredData: state.productReducer.filteredList,
  data: state.productReducer.list
})

const mapDispatchToProps = dispatch => ({
  productDetailPage: (item) => dispatch(productDetailPage(item)),
  addItem: (item) => dispatch(addItem(item)),
  // get: () => dispatch(getRemoteData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);