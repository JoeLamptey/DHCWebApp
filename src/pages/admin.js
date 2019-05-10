import React, {Component} from 'react'
//import Footer from '../components/footer'
import Header from '../components/header'
import AdminClient from '../components/AdminClient'
import AdminCarer from '../components/AdminCarer'
import AdminSupervisor from '../components/AdminSupervisor'
import AdminManager from '../components/AdminManager'
import AdminSchedules from '../components/AdminSchedules'
import AdminProfile from '../components/AdminProfile'

import '../styles/index.css'


class Admin extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){ //console.log(this.state)
        return(
            <div>
                <h1 >Admin Page</h1>
                <Header 
                    title="ADMINISTRATOR" 
                    menu={['Client','Carer', 'Supervisor', 'Manager']}
                    submenu={['Schedules', 'Profile', 'Logout']}
                    pages={[<AdminClient />,<AdminCarer />, 
                        <AdminSupervisor />, <AdminManager />, 
                        <AdminSchedules />, <AdminProfile />]}/>
            </div>
        )
    }
}

export default Admin