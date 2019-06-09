import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import AdminClientReports from './AdminClientReports'
import AdminClientNew from './AdminClientNew'
import AdminClientList from './AdminClientList'
//import AdminClientEvents from './AdminClientEvents'

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

class AdminClient extends Component {
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
      <div className='root'>
        <div className={classes.root}>
            <AppBar position="static" color="default" >
                  <Tabs value={value} 
                    variant="scrollable"
                    scrollButtons="on"
                    onChange={this.handleChange}
                    textColor="primary">
                    <Tab label="Add Client" />
                    <Tab label="Complaints" />
                    {/* <Tab label="Events" /> */}
                    <Tab label="List" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <AdminClientNew createClient={this.createClient}/>
                    </TabContainer>
                }
                {value === 1 && 
                    <TabContainer>
                        <AdminClientReports />
                    </TabContainer>}
                {/* {value === 2 && <TabContainer>
                    <AdminClientEvents />
                    </TabContainer>} */}
                {value === 2 && <TabContainer >
                    <AdminClientList />
                    </TabContainer>}
        </div>
      </div>
    );
  }
}

AdminClient.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminClient);
