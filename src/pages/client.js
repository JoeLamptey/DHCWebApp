import React, {Component} from 'react'
//import {Redirect} from 'react-router-dom'
import Header from '../components/header'
import ClientSchedule from '../components/clientComponents/ClientSchedule'
// import ClientEvents from '../components/clientComponents/ClientEvents'
import ClientReport from '../components/clientComponents/ClientReport'
import ClientProfile from '../components/clientComponents/ClientProfile'
import ClientLogout from '../components/clientComponents/ClientLogout'

class Client extends Component{

    state = {
        
      }
  
    render(){

 
        return(
            <div>
                <Header 
                    title={this.props.firstname.toUpperCase()+ '  '+ this.props.lastname.toUpperCase()}
                    menu={['Schedules', 'Reports']}
                    submenu={['Profile', 'Logout']}
                    menuPages={[<ClientSchedule {...this.props}/>, 
                        <ClientReport {...this.props}/>,]}
                    submenuPages={[ 
                        // <ClientEvents />, 
                        <ClientProfile {...this.props}/>,
                        <ClientLogout {...this.props}/>,]} />
            </div>
        )
    }
}

export default Client