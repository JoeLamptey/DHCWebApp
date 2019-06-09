import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import SupervisorCreateReport from './SupervisorCreateReport'
import SupervisorViewReport from './SupervisorViewReport'

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
    margin: '0% 5%',
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
          <Tabs value={value} onChange={this.handleChange} textColor="primary">
            <Tab label="Create Report" />
            <Tab label="View Reports" />
          </Tabs>
        </AppBar>
        {value === 0 && 
            <TabContainer>                
                <SupervisorCreateReport createClient={this.createClient} {...this.props}/>
            </TabContainer>
        }
        {value === 1 && 
            <TabContainer>
                <SupervisorViewReport {...this.props}/>
            </TabContainer>}
      </div>
    );
  }
}

CarerReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarerReport);
