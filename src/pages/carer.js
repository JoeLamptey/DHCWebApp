import React, {Component} from 'react'
import Header from '../components/header'
import CarerSchedule from '../components/carerComponents/CarerSchedule'
import CarerTraining from '../components/carerComponents/CarerTraining'
import CarerReport from '../components/carerComponents/CarerReports'
import CarerProfile from '../components/carerComponents/CarerProfile'
import CarerLogout from '../components/carerComponents/CarerLogout'

class Carer extends Component{
    render(){
        return(
            <div>
                <Header 
                    title='CARER' 
                    menu={['Schedules', 'Reports']}
                    submenu={['Training', 'Profile', 'Logout']}
                    menuPages={[<CarerSchedule />, 
                        <CarerReport />,]}
                    submenuPages={[ 
                        <CarerTraining />, 
                        <CarerProfile />,
                        <CarerLogout />,]} />
            </div>
        )
    }
}

export default Carer