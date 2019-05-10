import React, { Component } from "react"
import Button from '@material-ui/core/Button';
//import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import {Link} from 'gatsby'

import HomeStyles from '../components/home.module.css'
import IndexStyles from '../styles/index.css'

import Verify from '../components/Router'
//import {Redirect} from 'react-router-dom'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
})


class Index extends Component{
  state={
      notification: '',
      auth: {status: false, user: null}
  }

  login = (e) =>{
      e.preventDefault()

      let user = {
          email:  e.target.email.value,
          password: e.target.password.value
      }
      

      if(user.email === ''||user.password === ''){
          this.setState({notification: 'Please fill in the form'})
      }else{
          e.target.email.value = ''
          e.target.password.value = ''
          const auth = Verify(user)
          if(!auth.status){
            this.setState({
                auth: auth,
                notification: 'Failed login, Please try again!'
            })
          }else{
            this.setState({
                auth: auth,
                notification: 'Login successful!'
            })
            this.props.verifyUser(auth)
          }
          
          
      }        
  }

  render(){
      const { classes } = this.props;
       return (
          <div className={IndexStyles.body}>
              <div className={HomeStyles.login}>
                  <h1 className={HomeStyles.h1}>Domiciliary HealthCare</h1>
                  <form onSubmit={this.login}
                      className={[classes.container]} noValidate autoComplete="off">
                      <TextField
                          id="outlined-email-input"
                          label="Email"
                          className={classes.textField}
                          type="email"
                          name="email"
                          margin="normal"
                          variant="standard"
                          autoComplete="email"
                          fullWidth
                          required={true}
                          />
                      <TextField
                          id="outlined-password-input"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          name="password"
                          margin="normal"
                          variant="standard"
                          fullWidth
                          required={true}
                          />
                      <Button 
                          className={HomeStyles.button}
                          type='submit' 
                          variant='contained'
                          fullWidth 
                          color='primary'>Login</Button>
                  </form>
                  <div align='center'>{this.state.notification}</div>
              </div>
          </div>
      )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index)
