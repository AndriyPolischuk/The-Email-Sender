import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Error from './pages/Error';
import Analytics from './pages/Analytics';
import SendEmails from './pages/SendEmails';
import MyLeads from './pages/MyLeads';
import MyClients from './pages/MyClients';
import Client from './pages/Client';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Analytics} />
        <Route path='/sendemails' exact component={SendEmails} />
        <Route path='/myleads' exact component={MyLeads} />
        <Route path='/myclients' exact component={MyClients} />
        <Route path='/client/:clientId' exact component={Client} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
