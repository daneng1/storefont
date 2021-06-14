import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { addItem } from '../store/cart.js';
import { Card,Grid,FormControl,CardActions,CardContent,CardMedia,Button,Typography,Paper }from '@material-ui/core';
import './style/product-detail.scss';
import Modal from './modal.js';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 900,
    display: 'flex',
    flexDirection: 'row',
    margin: 50,
  },
  formControl: {
    flexDirection: 'column',
    marginTop: '150px',
    minWidth: 120,
  },
  paper: {
    height: 900,
    width: 900,
  },
  media: {
    height: 600,
    width: 600,
    paddingTop: 15,
  },
}));

const ProductDetails = (props) => {
  const [itemExists, setItemExists] = useState(false);

  const handleClick = ((item) => {
    setItemExists(false);
    let temp = false;
    if (props.cartReducer.cartCount === 0) return props.addItem(item);
    props.cartReducer.items.forEach((items) => {
      if (item._id === items._id) {
        setItemExists(true);
        temp = true;
      }
    })
    if (temp === false) props.addItem(item);
  });

  const classes = useStyles();
  let item = props.activeItem[0];


  return (

    <div className='root'
    >
      {itemExists ? <Modal innerText="That Item is Already in Your Cart"></Modal>
        : null}

      <Paper variant="outlined" />
      <Card className={classes.root} >
        <Grid
          className={classes.root}
        >
          <CardMedia
            className={classes.media}
            image={item.image}
            title={item.name}
            component="img"
          />
          <Grid>

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
            <CardActions>
              <Button onClick={() => handleClick(item)} size="small" color="primary">
                Add to Cart
              </Button>
              <FormControl className={classes.formControl}>
              </FormControl>
            </CardActions>
          </Grid>
        </Grid>
      </Card>

    </div>
  )
}


const mapStateToProps = state => ({
  cartReducer: state.cartReducer,
  activeItem: state.productReducer.activeItem
})

const mapDispatchToProps = dispatch => ({
  addItem: (item) => dispatch(addItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);