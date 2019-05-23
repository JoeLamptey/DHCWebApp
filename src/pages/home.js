import React, { Component } from "react"
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import '../styles/home.css'
import IndexStyles from '../styles/index.css'

import Verify from '../components/Router'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        borderColor: '#fff',
        textColor: '#fff',
      },
      button:{
          marginTop: theme.spacing.unit*2,
      }
})


class Index extends Component{
  state={
      notification: '',
      hide: 'none',
      auth: {status: false, user: null}
  }

  login = async (e) =>{
      e.preventDefault()

      let user = {
          email:  e.target.email.value,
          password: e.target.password.value
      }
      

        e.target.email.value = ''
        e.target.password.value = ''
          const auth = await Verify(user)
          //console.log('Auth: ',auth)

        if(!auth.status){ //console.log('False: ',auth)
            this.setState({
                auth: auth,
                hide: 'block',
                notification: 'Failed login, Please try again!'
            })
        }else{ //console.log('True: ',auth)
            this.setState({
                auth: auth,
                notification: 'Login successful!'
            })
            this.props.verifyUser(auth)
        }       
  }

  componentWillUpdate(){

  }

  render(){
      const { classes } = this.props;
       return (
          <div className={IndexStyles.body}>
              <div className='login'>
                  <h1 className='h1'>Domiciliary HealthCare</h1>
                  <form onSubmit={this.login}
                      className={[classes.container]} autoComplete="off">
                      <TextField
                          id="outlined-email-input"
                          label="Email"
                          className={classes.textField}
                          type="email"
                          name="email"
                          variant="standard"
                          autoComplete="email"
                          fullWidth
                          required
                          />
                      <TextField
                          id="outlined-password-input"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          name="password"
                          variant="standard"
                          fullWidth
                          required
                          />
                      <Button 
                          className={classes.button}
                          type='submit' 
                          variant='contained'
                          fullWidth 
                          color='primary'>Login</Button>
                  </form>
                  <div align='center' className='alert' style={{display: this.state.hide}} >{this.state.notification}</div>
              </div>
          </div>
      )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index)
