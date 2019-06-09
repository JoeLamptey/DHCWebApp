import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import SupervisorClientReports from './SupervisorClientReports'
//import SupervisorClientNew from './SupervisorClientNew'
import SupervisorClientList from './SupervisorClientList'
//import SupervisorClientEvents from './SupervisorClientEvents'
import SupervisorAddClient from './SupervisorAddClient'

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
    // margin: '0% 15%',
    backgroundImage: 'none !important',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button:{
      marginTop: theme.spacing.unit,
  }
});

class SupervisorClient extends Component {
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
    //console.log(this.props.region)

    return ( 
      <div className='root'>
          <div className={classes.root}>
            <AppBar position="static" color="default" >
              <Tabs value={value} 
                  variant="scrollable"
                  onChange={this.handleChange}
                  textColor="primary">
                <Tab label="Add Client" />
                <Tab label="Client's Complaints" />
                {/* <Tab label="Client's Events" /> */}
                <Tab label="Client List" />
                {/* <Tab label="Add Client Stepper" /> */}
              </Tabs>
            </AppBar>
            {value === 0 && 
                <TabContainer>                
                    <SupervisorAddClient {...this.props}/>
                </TabContainer>
            }
            {value === 1 && 
                <TabContainer>
                    <SupervisorClientReports {...this.props}/>
                </TabContainer>}
            {/* {value === 2 && <TabContainer>
                <SupervisorClientEvents {...this.props}/>
                </TabContainer>} */}
            {value === 2 && <TabContainer>
                <SupervisorClientList {...this.props}/>
                </TabContainer>}
              {/* {value === 4 && <TabContainer>
                <SupervisorAddClient {...this.props}/>
                </TabContainer>} */}
        </div>
      </div>
    );
  }
}

SupervisorClient.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SupervisorClient);
