import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import CarerCreateReport from './CarerCreateReport'
import CarerViewReport from './CarerViewReport'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: '0% 2%',
    backgroundImage: 'none !important',
  },
});

class CarerReport extends Component {
  state = {
    value: 0,
    notification: '',
    newClient: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  createClient = (e) =>{
    console.log(e) 
  }
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Tabs 
              variant="scrollable"
              scrollButtons="on"
              value={value} onChange={this.handleChange} textColor="primary">
            <Tab label="Create Report" />
            <Tab label="View Reports" />
          </Tabs>
        </AppBar>
        {value === 0 && 
            <TabContainer>                
                <CarerCreateReport createClient={this.createClient}/>
            </TabContainer>
        }
        {value === 1 && 
            <TabContainer>
                <CarerViewReport />
            </TabContainer>}
      </div>
    );
  }
}

CarerReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarerReport);
