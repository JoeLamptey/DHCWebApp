import React, { Component } from "react"
import Home from './pages/home'
import {Redirect} from 'react-router-dom'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      auth: {status: false, user: null}
    }
  }

  verifyUser = (user) =>{
    this.setState({auth: user})
    //console.log(this.state.auth)
  }
  render(){

      if(!this.state.auth.status){
       return (
          <Home verifyUser={this.verifyUser} />
      )}
      else if(this.state.auth.status && this.state.auth.user.type === 'admin'){ 
        return (<Redirect to='/admin' />)
      }
      else if(this.state.auth.status && this.state.auth.user.type === 'supervisor'){
        return (<Redirect to='/supervisor' />)
      }
      else if(this.state.auth.status && this.state.auth.user.type === 'carer'){
        return (<Redirect to='/carer' />)
      }
      else if(this.state.auth.status && this.state.auth.user.type === 'client'){
        return (<Redirect to='/client' />)
      }
      else if(this.state.auth.status && this.state.auth.user.type === 'manager'){
        return (<Redirect to='/manager' />)
      }
  }
}


export default App
