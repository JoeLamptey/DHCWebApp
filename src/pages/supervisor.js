import React, {Component} from 'react'
import Header from '../components/header'
import SupervisorClient from '../components/supervisorComponents/SupervisorClient'
import SupervisorCarer from '../components/supervisorComponents/SupervisorCarer'
import SupervisorMonitoring from '../components/supervisorComponents/SupervisorMonitoring'
import SupervisorReports from '../components/supervisorComponents/SupervisorReports'
import SupervisorSchedules from '../components/supervisorComponents/SupervisorSchedules'
import SupervisorProfile from '../components/supervisorComponents/SupervisorProfile'
import SupervisorLogout from '../components/supervisorComponents/SupervisorLogout'


class Supervisor extends Component{
    render(){
        return(
            <div>
                <Header 
                    title={this.props.firstname.toUpperCase()+ '  '+ this.props.lastname.toUpperCase()} 
                    menu={['Clients','Carers', 'Monitoring', 'My Reports' ]}
                    submenu={['Schedules', 'Profile', 'Logout']}
                    menuPages={[<SupervisorClient {...this.props}/>, 
                        <SupervisorCarer {...this.props}/>, 
                        <SupervisorMonitoring {...this.props}/>, 
                        <SupervisorReports {...this.props}/>,
                        ]}
                    submenuPages={[
                        <SupervisorSchedules {...this.props}/>,
                        <SupervisorProfile {...this.props}/>,
                        <SupervisorLogout />,
                    ]}/>
                        
            </div>
        )
    }
}

export default Supervisor