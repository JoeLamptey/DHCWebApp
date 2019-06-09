import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import AdminSupervisorReports from './AdminSupervisorReports'
import AdminSupervisorNew from './AdminSupervisorNew'
import AdminSupervisorList from './AdminSupervisorList'
//import AdminSupervisorTraining from './AdminSupervisorTraining'

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
    //flexGrow: 1,
    backgroundColor: theme.palette.background.paper,    
  },
  container: {
      '@media (min-width: 901px)':{
        width: '350px',
      },

      '@media (max-width: 900px) and (min-width: 600px)':{
        width: '65%',
      },

      '@media (min-width: 599px)':{
        width: '80%',
      }
  }
});

class AdminSupervisor extends Component {
  state = {
    value: 0,
    notification: '',
    newSupervisor: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  createSupervisor = (e) =>{
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
                    <Tab label="Add Supervisor" />
                    <Tab label="Reports" />
                    {/* <Tab label="Training" /> */}
                    <Tab label="List" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <AdminSupervisorNew createSupervisor={this.createSupervisor} {...this.props}/>
                    </TabContainer>
                }
                {value === 1 && 
                    <TabContainer>
                        <AdminSupervisorReports  {...this.props} />
                    </TabContainer>}
                {/* {value === 2 && <TabContainer>
                    <AdminSupervisorTraining />
                    </TabContainer>} */}
                {value === 2 && <TabContainer>
                    <AdminSupervisorList  {...this.props}/>
                    </TabContainer>}
        </div>
      </div>
    );
  }
}

AdminSupervisor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminSupervisor);
