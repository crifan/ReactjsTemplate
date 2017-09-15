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

import './graph.less';

export default class Graph extends Component {
  state = {
  };

  constructor(props) {
      super(props);
      console.log(`Graph constructor: props=`, props,
        ' ,props.match=', props.match,
        ' ,props.history=', props.history,
        ' ,props.location=', props.location
      );
  }

  componentDidMount(){
    console.log(`Graph componentDidMount`);
  }

  render() {
    console.log(`Graph render`);

    return (
      <div>
        <PageHeader>图表</PageHeader>
        <Article>
          <section>
            <h2 className="title">图表</h2>
            <section>
              <h3>3 Title</h3>
              <p>页面3</p>
            </section>
          </section>
        </Article>
      </div>
    );
  }
}

withRouter(Function);