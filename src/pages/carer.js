import React, {Component} from 'react'
//import {Redirect} from 'react-router-dom'
import Header from '../components/header'
import CarerSchedule from '../components/carerComponents/CarerSchedule'
// import CarerTraining from '../components/carerComponents/CarerTraining'
import CarerReport from '../components/carerComponents/CarerReports'
import CarerProfile from '../components/carerComponents/CarerProfile'
import CarerLogout from '../components/carerComponents/CarerLogout'

class Carer extends Component{

    state = { }
    
   

    render(){

        return(
            <div>
                <Header 
                    title={this.props.firstname.toUpperCase()+ '  '+ this.props.lastname.toUpperCase()}
                    menu={['Schedules', 'My Reports']}
                    submenu={['Profile', 'Logout']}
                    menuPages={[<CarerSchedule {...this.props}/>, 
                        <CarerReport {...this.props}/>,]}
                    submenuPages={[ 
                        // <CarerTraining {...this.props}/>, 
                        <CarerProfile {...this.props}/>,
                        <CarerLogout />,]} />
            </div>
        )
    }
}

export default Carer