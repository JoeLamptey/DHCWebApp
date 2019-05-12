import React, {Component} from 'react'
import {Redirect}  from 'react-router-dom'

class SupervisorLogout extends Component{
    render(){
        return(
            <div><Redirect to='/'/></div>
        )
    }
}

export default SupervisorLogout