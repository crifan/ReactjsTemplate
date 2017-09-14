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
import './main.less';
import {
  PageHeader,
} from 'react-bootstrap';

export default class Main extends Component {
  state = {
    // curUserInfo : EMPTY_USER_INFO,
    isNaviBarCollapse: false
  };

  constructor(props) {
      super(props);
      console.log(`Main constructor: props=`, props,
        ' ,props.match=', props.match,
        ' ,props.history=', props.history,
        ' ,props.location=', props.location
      );
      // console.log(this.props.location.state.curUserInfo);
      // this.state.curUserInfo = this.props.location.state.curUserInfo;
      // console.log(this.state.curUserInfo);
  }

  componentDidMount(){
    console.log(`Main componentDidMount`);
  }

  render() {
    // console.log(`Main render: this.state.curUserInfo.isLogin=${this.state.curUserInfo.isLogin}`);
    console.log(`Main render: AppGlobal.curUserInfo.isLogin=${AppGlobal.curUserInfo.isLogin}`);

    return (
      <div className="main_wrapper">
        <PageHeader>
        首页
        </PageHeader>
      </div>
    );
  }
}

withRouter(Main);