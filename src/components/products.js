import React from 'react';
import { connect } from 'react-redux';
import { activeProd } from '../store/products.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


// const handleChange = (event) => {
//   setSpacing(Number(event.target.value));
// };

const Products = props => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  let active = props.categoryReducer.activeCat;
  let products = props.productReducer.products;
  return (
    <section>
      {active !== null ? (
        <Grid container className={classes.root} spacing={2}>
          {products.filter((item) => item.category === active && item.inventory > 0).map((item) => {
            return (
              <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                  <Grid key={item.name} item>
                    <Paper className={classes.paper} />
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={item.image}
                          title={item.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name.toUpperCase()}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">{item.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      ) : ''}
    </section>
  )
}

const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
  productReducer: state.productReducer
})

const mapDispatchToProps = { activeProd }

export default connect(mapStateToProps, mapDispatchToProps)(Products);