import React, {Component} from 'react'
//import {Redirect} from 'react-router-dom'
import Header from '../components/header'
import ManagerSchedule from '../components/managerComponents/ManagerSchedule'
import ManagerEvents from '../components/managerComponents/ManagerEvents'
import ManagerReport from '../components/managerComponents/ManagerReport'
import ManagerProfile from '../components/managerComponents/ManagerProfile'
import ManagerLogout from '../components/managerComponents/ManagerLogout'

class Manager extends Component{

    state = {
        
      }
    
 
    render(){

        return(
            <div>
                <Header 
                    title={this.props.firstname.toUpperCase()+ '  '+ this.props.lastname.toUpperCase()}
                    menu={['Schedules', 'Reports']}
                    submenu={['Events', 'Profile', 'Logout']}
                    menuPages={[<ManagerSchedule />, 
                        <ManagerReport />,]}
                    submenuPages={[ 
                        <ManagerEvents />, 
                        <ManagerProfile />,
                        <ManagerLogout />,]} />
            </div>
        )
    }
}

export default Manager