import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import SupervisorCarerReports from './SupervisorCarerReport'
import SupervisorCarerNew from './SupervisorCarerNew'
import SupervisorCarerList from './SupervisorCarerList'
import SupervisorCarerTraining from './SupervisorCarerTraining'

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

class SupervisorCarer extends Component {
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
  
  componentWillMount(){ //console.log(this.props.region)
    this.setState({...this.props.region})
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
                    <Tab label="Training" />
                    <Tab label="List" />
                  </Tabs>
                </AppBar>
                {value === 0 && 
                    <TabContainer>                
                        <SupervisorCarerNew createCarer={this.createCarer}/>
                    </TabContainer>
                }
                {value === 1 && 
                    <TabContainer>
                        <SupervisorCarerReports {...this.props}/>
                    </TabContainer>}
                {value === 2 && <TabContainer>
                    <SupervisorCarerTraining {...this.props}/>
                    </TabContainer>}
                {value === 3 && <TabContainer >
                    <SupervisorCarerList  {...this.props}/>
                    </TabContainer>}
        </div>
      </div>
    );
  }
}

SupervisorCarer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SupervisorCarer);
