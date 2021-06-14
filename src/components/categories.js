import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCat,reset, getRemoteCategory } from '../store/categories.js';
import { removeActiveItem } from '../store/products.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import './style/reset.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />

  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


const Categories = props => {
  
  const setCat = (data) => {
    props.selectCat(data);
    props.resetActive();
    
  }

  const fetchData = (e) => {
    e && e.preventDefault();
    props.get();
  }

  function Data() {
    useEffect(() => {
      fetchData();
    }, []);
  }

  Data();
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label='HOME' onClick={(e) => {props.reset(); e.preventDefault()}} key='all' {...a11yProps(0)} />
          {props.data.map((cat) => { return <LinkTab label={cat.name} onClick={(e) => setCat(cat.name)} key={cat._id} {...a11yProps(1)} />
        })}
        
        </Tabs>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.categoryReducer.categories
})

const mapDispatchToProps = dispatch => ({
  selectCat: (name) => dispatch(selectCat(name)),
  resetActive: () => dispatch(removeActiveItem()),
  reset: () => dispatch(reset()),
  get: () => dispatch(getRemoteCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);