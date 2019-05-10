import React, {Component} from 'react'
import Header from '../components/header'
import SupervisorClient from '../components/supervisorComponents/SupervisorClient'
import SupervisorCarer from '../components/supervisorComponents/SupervisorCarer'
import SupervisorMonitoring from '../components/supervisorComponents/SupervisorMonitoring'
import SupervisorReports from '../components/supervisorComponents/SupervisorReports'
import SupervisorSchedules from '../components/supervisorComponents/SupervisorSchedules'
import SupervisorProfile from '../components/supervisorComponents/SupervisorProfile'

class Supervisor extends Component{
    render(){
        return(
            <div>
                <Header 
                    title='SUPERVISOR' 
                    menu={['Clients','Carers', 'Monitoring', 'Reports' ]}
                    submenu={['Schedules', 'Profile', 'Logout']}
                    pages={[<SupervisorClient />, 
                        <SupervisorCarer />, 
                        <SupervisorMonitoring />, 
                        <SupervisorReports />,
                        <SupervisorSchedules />,
                        <SupervisorProfile />]} />
            </div>
        )
    }
}

export default Supervisor