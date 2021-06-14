import React from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { deleteItem, resetCart } from '../store/cart.js';
import CreditCard from './creditCard';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/Button';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

function Checkout(props) {

  let subTotal = props.data.reduce((a,b) => a + (+(b.price.slice(1))), 0);
  const classes = useStyles();


  return (
<Container >

  <Paper style={{ padding: '15px', marginTop: '150px'}}>
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
         <StyledTableCell align='left'>Photo</StyledTableCell>
         <StyledTableCell>Item</StyledTableCell>
         <StyledTableCell align='right'>Quantity</StyledTableCell>
         <StyledTableCell align='right'>Price</StyledTableCell>
         <StyledTableCell align='right'>Remove</StyledTableCell>
        </TableHead>
        <TableBody>
          {props.data.map((item, idx) => {
          return (
          <StyledTableRow key={idx}>
            <StyledTableCell>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px'}}/></StyledTableCell>
            <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell align='right'>1</StyledTableCell>
            <StyledTableCell align='right'>{item.price}</StyledTableCell>
            <StyledTableCell align='right'>
            <IconButton  aria-label="delete" onClick={() => props.deleteItem(item, idx)}>
                <DeleteIcon/>
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>

          )}
          )}
          <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell align='right'> Cart Total</StyledTableCell>
            <StyledTableCell align='right'>${subTotal.toFixed(2)}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell align='right'>Taxes</StyledTableCell>
            <StyledTableCell align='right'>${(subTotal * .1).toFixed(2) }</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell align='right'>Shipping</StyledTableCell>
            <StyledTableCell align='right'>${(subTotal * .03).toFixed(2) }</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell align='right'>Order Total</StyledTableCell>
            <StyledTableCell align='right'>${((subTotal * 1.1) + (subTotal > 3500 ? 25.99 : subTotal * .07 )).toFixed(2)}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <CreditCard/>
  </Paper>
</Container>
  )
}

const mapStateToProps = state => ({
  data: state.cartReducer.items,
  
})

const mapDispatchToProps = dispatch => ({
  deleteItem: (item) => dispatch(deleteItem(item)),
  resetCart: () => dispatch(resetCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);