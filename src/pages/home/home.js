import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from 'react-router-dom';
import { ROUTE_PREFIX, EMPTY_USER_INFO } from 'common/define';
import { SLASH_PUBLIC_PATH } from 'common/config';
import AppGlobal from 'common/app-global';

import {
  PageHeader,
} from 'react-bootstrap';

import {
  Tab,
  TabBarItem,
  Article,
} from 'react-weui';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import './home.less';

export default class Home extends Component {
  state = {
  };

  constructor(props) {
      super(props);
      console.log(`Home constructor: props=`, props,
        ' ,props.match=', props.match,
        ' ,props.history=', props.history,
        ' ,props.location=', props.location
      );
  }

  componentDidMount(){
    console.log(`Home componentDidMount`);
  }

  render() {
    console.log(`Home render`);

    return (
      <div>
        <PageHeader>首页</PageHeader>
        <Article>
          <section>
            <h2 className="title">首页</h2>
            <section>
              <h3>1.1 Title</h3>
              <p>页面1</p>
            </section>
          </section>
        </Article>
      </div>
    );
  }
}

withRouter(Home);