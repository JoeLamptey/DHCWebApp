import React, {Component} from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import SupervisorClient from '../components/SupervisorClient'
import SupervisorCarer from '../components/SupervisorCarer'
import SupervisorMonitoring from '../components/SupervisorMonitoring'
import SupervisorReports from '../components/SupervisorReports'

class Supervisor extends Component{
    render(){
        return(
            <div>
                <Header 
                    title='SUPERVISOR' 
                    menu={['Clients','Carers', 'Monitoring', 'Reports' ]}
                    pages={[<SupervisorClient />, 
                        <SupervisorCarer />, 
                        <SupervisorMonitoring />, 
                        <SupervisorReports />]} />
                <Footer />
            </div>
        )
    }
}

export default Supervisor