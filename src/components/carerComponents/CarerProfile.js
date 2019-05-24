import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import EditProfile from './EditProfile'


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

class CarerProfile extends Component {
  state = {
    value: 0,
  };

 
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
                    <Tab label="Edit Profile" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <EditProfile {...this.props} />
                    </TabContainer>
                }
        </div>
      </div>
    );
  }
}

CarerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarerProfile);
