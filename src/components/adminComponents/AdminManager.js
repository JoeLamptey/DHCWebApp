import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import AdminManagerReports from './AdminManagerReports'
import AdminManagerNew from './AdminManagerNew'
import AdminManagerList from './AdminManagerList'
import AdminManagerEvents from './AdminManagerEvents'

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
    width: '300px',
  }
});

class AdminManager extends Component {
  state = {
    value: 0,
    notification: '',
    newManager: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  createManager = (e) =>{
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
                    <Tab label="Add Manager" />
                    <Tab label="Manager's Complaints" />
                    <Tab label="Manager's Events" />
                    <Tab label="Manager List" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <AdminManagerNew createManager={this.createManager}/>
                    </TabContainer>
                }
                {value === 1 && 
                    <TabContainer>
                        <AdminManagerReports />
                    </TabContainer>}
                {value === 2 && <TabContainer>
                    <AdminManagerEvents />
                    </TabContainer>}
                {value === 3 && <TabContainer >
                    <AdminManagerList />
                    </TabContainer>}
        </div>
      </div>
    );
  }
}

AdminManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminManager);
