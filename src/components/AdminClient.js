import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

import AdminClientReports from './AdminClientReports'

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
    margin: '0% 15%',
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
      e.preventDefault()

      const newClient={
        firstname: e.target.firstname.value,
        middlename: e.target.middlename.value,
        lastname: e.target.lastname.value,
        birthday: e.target.birthday.value,
        postcode: e.target.postcode.value,
        email: e.target.email.value,
        telephone: e.target.telephone.value,
        address: e.target.address.value,
        region: e.target.region.value,
        nextofkin: e.target.nextofkin.value,
        nokemail: e.target.nokemail.value,
        nokmobile: e.target.nokmobile.value,
      }

      
      if(newClient.firstname === ''|| newClient.lastname === ''
        || newClient.postcode === ''|| newClient.telephone === ''
        || newClient.address === '' || newClient.nextofkin === ''
        || newClient.birthday === '' || newClient.nokmobile === ''
      ){
        this.setState({
            notification: 'Please fill the required fields marked *'
        })
      }else{
        this.setState({
            newClient: newClient
        })
        e.target.firstname.value = ''
        e.target.middlename.value = ''
        e.target.lastname.value = ''
        e.target.birthday.value = ''
        e.target.postcode.value = ''
        e.target.email.value = ''
        e.target.telephone.value = ''
        e.target.address.value = ''
        e.target.region.value = ''
        e.target.nextofkin.value = ''
        e.target.nokemail.value = ''
        e.target.nokmobile.value = ''
        //console.log(this.state.newClient)  
      }    
  }
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Tabs value={value} onChange={this.handleChange} textColor="primary">
            <Tab label="Add Client" />
            <Tab label="Client Reports" />
            <Tab label="Client Programs" />
          </Tabs>
        </AppBar>
        {value === 0 && 
            <TabContainer>                
                <form onSubmit={this.createClient}
                    className={classes.container} noValidate autoComplete="off">
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='First Name'
                        name='firstname'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Middle Name'
                        name='middlename'
                        type='text'
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Last Name'
                        name='lastname'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Email'
                        name='email'
                        type='email'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Birthday'
                        name='birthday'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Postcode'
                        name='postcode'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Telephone'
                        name='telephone'
                        type='tel'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Address'
                        name='address'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Region'
                        name='region'
                        type='text'
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Next of Kin'
                        name='nextofkin'
                        type='text'
                        required
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='NoK Mobile'
                        name='nokmobile'
                        type='text'
                        required
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='NoK Email'
                        name='nokemail'
                        type='email'
                    />
                    <Button 
                        className={classes.button}
                        type='submit'
                        variant='contained'
                        
                        color='primary'
                    >Create Client</Button>
                </form>
                <div align='center' className='alert'>{this.state.notification}</div>
            </TabContainer>
        }
        {value === 1 && 
            <TabContainer>
                <AdminClientReports />
            </TabContainer>}
        {value === 2 && <TabContainer>Any client events, birthdays, anniversary, or burial </TabContainer>}
      </div>
    );
  }
}

AdminClient.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminClient);
