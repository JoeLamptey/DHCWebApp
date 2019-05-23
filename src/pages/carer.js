import React, {Component} from 'react'
//import {Redirect} from 'react-router-dom'
import Header from '../components/header'
import CarerSchedule from '../components/carerComponents/CarerSchedule'
import CarerTraining from '../components/carerComponents/CarerTraining'
import CarerReport from '../components/carerComponents/CarerReports'
import CarerProfile from '../components/carerComponents/CarerProfile'
import CarerLogout from '../components/carerComponents/CarerLogout'

class Carer extends Component{

    state = {
        // redirectToPreviousRoute: false
      }
    
    //   login = () => {
    //     AuthService.authenticate(() => {
    //       this.setState({ redirectToPreviousRoute: true });
    //     });
    //   }

    render(){

        // const { from } = this.props.location.state || { from: { pathname: "/" } };
        // const { redirectToPreviousRoute } = this.state;

        // if (redirectToPreviousRoute) {
        //     return <Redirect to={from} />;
        // }

        return(
            <div>
                <Header 
                    title={this.props.firstname.toUpperCase()+ '  '+ this.props.lastname.toUpperCase()}
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