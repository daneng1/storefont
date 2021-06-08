import React from 'react';
import { connect } from 'react-redux';
import { selectCat, reset } from '../store/categories.js';

const Categories = props => {
  // console.log(props.categoryReducer.activeCat);
  return (
    <section>
      <h1>Categories</h1>
      <ul>
        {props.categoryReducer.categories.map(cat =>{
          return <li onClick={() => props.selectCat(cat.name)} key={cat.name}>{cat.displayName}</li>
        })}
        <li onClick={() => props.reset()}>View All Categories</li>
        <p>Active Category: {props.categoryReducer.activeCat}</p>
      </ul>
    </section>
  )
}

const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer
})

const mapDispatchToProps = dispatch =>({ 
  selectCat: (name) => dispatch(selectCat(name)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);