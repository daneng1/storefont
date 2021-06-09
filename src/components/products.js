import React from 'react';
import { connect } from 'react-redux';
import { activeProd } from '../store/products.js';
import { addItem } from '../store/cart.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './style/products.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
    margin: 100,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


const Products = props => {
  // const [spacing] = React.useState(2);
  const classes = useStyles();
  let active = props.categoryReducer.activeCat;
  let products = props.productReducer.products;

  return (
    <div className='product-list'>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          {active !== null ? (
            <div>
              {products.filter((item) => item.category === active && item.inventory > 0).map((item) => {
                return (
                  <section key={item.name}>
                    <Card className={classes.root} >
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
                        <Button onClick={() => props.addItem(item)} size="small" color="primary">
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </section>
                )
              })
              }
            </div>
          ) : ''}
        </Container>
      </React.Fragment>
    </div>
  )
}

const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
  productReducer: state.productReducer,
  cartReducer: state.cartReducer
})

const mapDispatchToProps = dispatch => ({
  activeProd: () => dispatch(activeProd()),
  addItem: (item) => dispatch(addItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);