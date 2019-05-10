import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Admin from './pages/admin';
import Supervisor from './pages/supervisor';
import Client from './pages/client';
import Carer from './pages/carer';
import Manager from './pages/manager';

import {BrowserRouter as Router,Route} from 'react-router-dom'

const DHCRouter = ()=>{
    return(
        <Router>
            <Route path='/'  exact component={App} />
            <Route path='/admin' exact component={Admin} />
            <Route path='/supervisor' exact component={Supervisor} />
            <Route path='/carer' exact component={Carer} />
            <Route path='/client' exact component={Client} />
            <Route path='/manager' exact component={Manager} />
        </Router>
    )
}

ReactDOM.render(<DHCRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
