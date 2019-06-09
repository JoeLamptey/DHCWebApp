import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import AdminCarerReports from './AdminCarerReports'
import AdminCarerNew from './AdminCarerNew'
import AdminCarerList from './AdminCarerList'
//import AdminCarerTraining from './AdminCarerTraining'

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

class AdminCarer extends Component {
  state = {
    value: 0,
    notification: '',
    newCarer: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  createCarer = (e) =>{
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
                    <Tab label="Add Carer" />
                    <Tab label="Reports" />
                    {/* <Tab label="Training" /> */}
                    <Tab label="List" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <AdminCarerNew createCarer={this.createCarer} />
                    </TabContainer>
                }
                {value === 1 && 
                    <TabContainer>
                        <AdminCarerReports {...this.props}/>
                    </TabContainer>}
                {/* {value === 2 && <TabContainer>
                    <AdminCarerTraining />
                    </TabContainer>} */}
                {value === 2 && <TabContainer >
                    <AdminCarerList {...this.props}/>
                    </TabContainer>}
        </div>
      </div>
    );
  }
}

AdminCarer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCarer);
