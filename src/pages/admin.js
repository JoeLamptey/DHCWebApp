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
    render(){ 
        //console.log(this.props)
        //console.log(this.states)
        return(
            <div>
                <Header 
                    title= {this.props.firstname.toUpperCase()+ '  '+ this.props.lastname.toUpperCase()}
                    menu={['Clients','Carers', 'Supervisors', 'Managers']}
                    submenu={['Monitoring', 'Profile', 'Logout']}
                    menuPages={[<AdminClient {...this.props}/>,<AdminCarer {...this.props} />, 
                        <AdminSupervisor />, <AdminManager />, 
                        ]}
                    submenuPages={[ 
                        <AdminSchedules />, <AdminProfile {...this.props}/>, <AdminLogout />]}/>
            </div>
        )
    }
}

export default Admin