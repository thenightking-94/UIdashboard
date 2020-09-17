import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
  Link, Redirect
} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RaiseConcern from './components/RaiseConcern';
import MailConcern from './components/MailConcern';


class App extends Component {

  render() {
    return (
      <div>
        <MetaTags>
          <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,
                user-scalable=no,target-densitydpi=device-dpi"/>
        </MetaTags>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              {localStorage.getItem('userID') &&
                <Route exact path="/dashboard" component={Dashboard} />}
              {localStorage.getItem('userID') &&
                <Route exact path="/raiseconcern" component={RaiseConcern} />}
              {localStorage.getItem('userID') &&
                <Route exact path="/inbox" component={MailConcern} />
              }
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
