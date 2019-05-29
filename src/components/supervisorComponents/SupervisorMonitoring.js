import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import MonitoringTableView from './MonitoringTableView'
import MonitoringMapView from './MonitoringMapView'


import '../../styles/admin_client.css'

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
  },
  container:{
    width: '400px',
  }
});

class SupervisorMonitoring extends Component {
  state = {
    value: 0,
    notification: '',
    newSchedules: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  createSchedules = (e) =>{
    console.log(e) 
  }
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className='root'>
        <div className={classes.root}>
            <AppBar position="static" color="default" >
                  <Tabs value={value} 
                    variant="scrollable"
                    scrollButtons="on"
                    onChange={this.handleChange} textColor="primary">
                    <Tab label="Tabular View" />
                    <Tab label="Map View" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <MonitoringTableView />
                    </TabContainer>
                }
                {value === 1 && 
                    <TabContainer>
                        <MonitoringMapView />
                    </TabContainer>}
        </div>
      </div>
    );
  }
}

SupervisorMonitoring.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SupervisorMonitoring);
