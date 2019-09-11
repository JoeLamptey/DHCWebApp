import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Admin from './pages/admin';
import Supervisor from './pages/supervisor';
import Client from './pages/client';
import Carer from './pages/carer';
import Manager from './pages/manager';
//import Home from './pages/home'
import NoMatch from './pages/NoMatch';

import {BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'


class DHCRouter extends Component{
   constructor(props){
       super(props)
       this.state={
        auth: {status: false, user: null}
       }
   }

   verifyUser = (auth) =>{
        this.setState({auth: auth})
    }

    render(){ console.log(this.state.auth)
        
        return(
            <Router>
                <Switch>
                    <Route exact path='/' render={()=><App verifyUser={this.verifyUser} />}/>
                    <Route exact path='/carer'  render={()=>
                        ((this.state.auth.status && this.state.auth.user.type === 'carer')?
                            <Carer {...this.state.auth.user} />: <Redirect to='/' />)                          
                        } />
                    <Route exact path='/admin'  render={()=>
                        ((this.state.auth.status && this.state.auth.user.type === 'admin')?
                            <Admin {...this.state.auth.user} />: <Redirect to='/' />)                          
                        } />
                    <Route exact path='/supervisor'  render={()=>
                        ((this.state.auth.status && this.state.auth.user.type === 'supervisor')?
                            <Supervisor {...this.state.auth.user} />: <Redirect to='/' />)                          
                        } />
                    <Route exact path='/client'  render={()=>
                        ((this.state.auth.status && this.state.auth.user.type === 'client')?
                            <Client {...this.state.auth.user} />: <Redirect to='/' />)                          
                        } />
                    <Route exact path='/manager'  render={()=>
                        ((this.state.auth.status && this.state.auth.user.type === 'manager')?
                            <Manager {...this.state.auth.user} />: <Redirect to='/' />)                          
                        } />
                    {/* <Route exact path='/test'  component={Algorithm} /> */}
                    {/* <Route exact path='/carer'  component={Carer} />
                    <Route exact path='/supervisor'  component={Supervisor} />
                    <Route exact path='/client'  component={Client} />
                    <Route exact path='/manager'  component={Manager} /> */}
                    <Route exact component={NoMatch} />
                </Switch>            
            </Router>
        )
    }
}

ReactDOM.render(<DHCRouter />, document.getElementById('root'));

