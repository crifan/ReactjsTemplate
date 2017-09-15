import React, { Component } from 'react';
import { SLASH_PUBLIC_PATH } from 'common/config';
import { ROUTE_PREFIX } from 'common/define';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Index from './index/index';
import Login from './login/login';
import Main from './main/main';

export default class App extends Component {

  constructor(props) {
      super(props);
      console.log(`App constructor`);
  }

  render() {
    console.log(`App render`);

    return (
      //Componet under Router can get there props: match, location, history

      // Note: following Main Route should NOT add 'exact'
      // otherwise sub pages can not show after router change url

      <Router basename={SLASH_PUBLIC_PATH}>
        <Switch>
          <Route exact  path={ROUTE_PREFIX.INDEX} component={Index} />
          <Route exact  path={ROUTE_PREFIX.LOGIN} component={Login} />
        </Switch>
      </Router>
    );
  }
}
