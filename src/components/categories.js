import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCat, getRemoteCategory, putRemoteCategory, resetRemoteCategory } from '../store/categories.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

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

  const fetchData = (e) => {
    e && e.preventDefault();
    props.get();
  }
  useEffect(() => {
    fetchData();
  }, [])
  
  const resetData = (e) => {
    e && e.preventDefault();
    props.reset();
  }

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
          <LinkTab label='HOME'  onClick={() => resetData()} key='all' {...a11yProps(0)} />
          {props.data().map(cat => { return <LinkTab label={cat.displayName}  onClick={() => props.selectCat(cat.name)} key={cat._id} {...a11yProps(1)} />
        })}
        </Tabs>
      </AppBar>
    </div>
  )
}


const mapStateToProps = state => ({
  selectCat : state.selectCat
})

const mapDispatchToProps = dispatch => ({
  selectCat: (name) => dispatch(selectCat(name)),
  get: () => dispatch(getRemoteCategory()),
  put: () => dispatch(putRemoteCategory()),
  reset: () => dispatch(resetRemoteCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);