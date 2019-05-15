import React, {Component} from 'react'
//import Footer from '../components/footer'
import Header from '../components/header'
import AdminClient from '../components/adminComponents/AdminClient'
import AdminCarer from '../components/adminComponents/AdminCarer'
import AdminSupervisor from '../components/adminComponents/AdminSupervisor'
import AdminManager from '../components/adminComponents/AdminManager'
import AdminSchedules from '../components/adminComponents/AdminSchedules'
import AdminProfile from '../components/adminComponents/AdminProfile'
import AdminLogout from '../components/adminComponents/AdminLogout'

//import '../styles/index.css'


class Admin extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){ //console.log(this.state)
        return(
            <div>
                <Header 
                    title="ADMINISTRATOR" 
                    menu={['Clients','Carers', 'Supervisors', 'Managers']}
                    submenu={['Schedules', 'Profile', 'Logout']}
                    menuPages={[<AdminClient />,<AdminCarer />, 
                        <AdminSupervisor />, <AdminManager />, 
                        ]}
                    submenuPages={[ 
                        <AdminSchedules />, <AdminProfile />, <AdminLogout />]}/>
            </div>
        )
    }
}

export default Admin