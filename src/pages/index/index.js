import React, { Component } from 'react';
import { ROUTE_PREFIX, EMPTY_USER_INFO } from 'common/define';
import { withRouter, Redirect } from 'react-router-dom';
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

import './index.less';

import IconHome from 'assets/img/icon_nav_button.png';
import IconFunction from 'assets/img/icon_nav_msg.png';
import IconGraph from 'assets/img/icon_nav_article.png';
import IconMy from 'assets/img/icon_nav_cell.png';

import Home from 'pages/home/home';
import Function from 'pages/function/function';
import Graph from 'pages/graph/graph';
import My from 'pages/my/my';

export default class Index extends Component {
  state = {
    // curUserInfo : EMPTY_USER_INFO
    curTabIdx: 0,    
  };

  constructor(props) {
    super(props);
    console.log(`Index constructor`);
    console.log(this.props);

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(newTabIdx){
    console.log('onTabChange: newTabIdx=', newTabIdx);

    // if (newTabIdx === this.state.curTabIdx) {
    //   console.log('click current tab: not change');      
    // } else {
    //   console.log('this.props.history=', this.props.history);

    //   if (this.props.history) {
    //     console.log(`jump to path: ${ROUTE_PREFIX.WELCOME}`);
    //     this.props.history.push(ROUTE_PREFIX.WELCOME);
    //   }
    // }
  }

  render() {
    // console.log(`Index render: this.state.curUserInfo.isLogin=${this.state.curUserInfo.isLogin}`);
    console.log('Index render: curUserInfo=', AppGlobal.curUserInfo);

    return (
      AppGlobal.curUserInfo.isLogin
      ?
      (
        <div className="tab_container">
          <Tab
            type="tabbar"
            defaultIndex={this.state.curTabIdx}
            onChange={this.onTabChange}
          >
            <TabBarItem icon={<img src={IconHome}/>} label="首页">
              <Home />
            </TabBarItem>

            <TabBarItem icon={<img src={IconFunction}/>} label="功能">
              <Function />
            </TabBarItem>

            <TabBarItem icon={<img src={IconGraph}/>} label="图表">
              <Graph />
            </TabBarItem>

            <TabBarItem icon={<img src={IconMy}/>} label="我的">
              <My />
            </TabBarItem>
          </Tab>
        </div>
      )
      :
      <Redirect to={
        {
          pathname: ROUTE_PREFIX.LOGIN
        }
      }/>
    );
  }
}

withRouter(Index);