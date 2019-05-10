import React, {Component} from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import AdminClient from '../components/AdminClient'
import AdminCarer from '../components/AdminCarer'
import AdminSupervisor from '../components/AdminSupervisor'
import AdminManager from '../components/AdminManager'

import '../styles/index.css'


class Admin extends Component{
    render(){
        return(
            <div>
                <h1 >Admin Page</h1>
                <Header 
                    title="ADMINISTRATOR" 
                    menu={['Client','Carer', 'Supervisor', 'Manager']}
                    pages={[<AdminClient />,<AdminCarer />, <AdminSupervisor />, <AdminManager />]}/>
                <Footer />
            </div>
        )
    }
}

export default Admin