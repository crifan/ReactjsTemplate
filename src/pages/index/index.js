import React, { Component } from 'react';
import { ROUTE_PREFIX, EMPTY_USER_INFO } from 'common/define';
import {
  Route,
  Switch,
  withRouter,
  Redirect } from 'react-router-dom';
import AppGlobal from 'common/app-global';

import {
  Tab,
  TabBody,
  TabBar,
  TabBarItem,
  TabBarIcon,
  TabBarLabel,
  Article,
} from 'react-weui';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import {
  PageHeader,
} from 'react-bootstrap';

import './index.less';

// import IconHome from 'assets/img/icon_nav_button.png';
// import IconFunction from 'assets/img/icon_nav_msg.png';
// import IconGraph from 'assets/img/icon_nav_article.png';
// import IconMy from 'assets/img/icon_nav_cell.png';

import IconHomeActive       from 'assets/img/tab_home_active.png';
import IconHomeInactive     from 'assets/img/tab_home_inactive.png';
import IconFunctionActive   from 'assets/img/tab_function_active.png';
import IconFunctionInactive from 'assets/img/tab_function_inactive.png';
import IconGraphActive      from 'assets/img/tab_graph_active.png';
import IconGraphInactive    from 'assets/img/tab_graph_inactive.png';
import IconMyActive         from 'assets/img/tab_my_active.png';
import IconMyInactive       from 'assets/img/tab_my_inactive.png';

// import Tabbar from 'components/tabbar';

import Home from 'pages/home/home';
import Function from 'pages/function/function';
import Graph from 'pages/graph/graph';
import My from 'pages/my/my';

const TabInfo = {
  home : {
    index: 0,
    title: '首页',
    icon: {
      active:   IconHomeActive,
      inactive: IconHomeInactive,
    },
    route: ROUTE_PREFIX.HOME
  },

  function : {
    index: 1,
    title: '功能',
    icon: {
      active:   IconFunctionActive,
      inactive: IconFunctionInactive,
    },
    route: ROUTE_PREFIX.FUNCTION
  },

  graph : {
    index: 2,
    title: '图表',
    icon: {
      active:   IconGraphActive,
      inactive: IconGraphInactive,
    },
    route: ROUTE_PREFIX.GRAPH
  },

  my : {
    index: 3,
    title: '我的',
    icon: {
      active:   IconMyActive,
      inactive: IconMyInactive,
    },
    route: ROUTE_PREFIX.MY
  }
};

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

    // console.log('window=', window);
    // console.log('window.Headers=', window.Headers);
    // // console.log('window.Headers()=', window.Headers());
  }

  onTabChange(newTabIdx){
    console.log('onTabChange: newTabIdx=', newTabIdx);

    if (newTabIdx === this.state.curTabIdx) {
      console.log('click current tab: not change');      
    } else {
      console.log('this.props.history=', this.props.history);
      console.log('TabInfo.function.index=', TabInfo.function.index);
      
      if (this.props.history) {
        let tabUrl = null;
        switch(newTabIdx){
          case TabInfo.home.index:
            tabUrl = TabInfo.home.route;
            break;
          case TabInfo.function.index:
            tabUrl = TabInfo.function.route;
            console.log('tabUrl=', tabUrl);
            break;
          case TabInfo.graph.index:
            tabUrl = TabInfo.graph.route;
            break;
          case TabInfo.my.index:
            tabUrl = TabInfo.my.route;
            break;
        }

        if (tabUrl) {
          this.setState({curTabIdx: newTabIdx});

          console.log(`jump to path: ${tabUrl}`);
          this.props.history.push(tabUrl);  
        }
      }
    }
  }

  render() {
    // console.log(`Index render: this.state.curUserInfo.isLogin=${this.state.curUserInfo.isLogin}`);
    console.log('Index render: curUserInfo=', AppGlobal.curUserInfo);

    // icon={this.state.curTabIdx === TabInfo.function.index ? <img src={TabInfo.function.icon.active}/> : <img src={TabInfo.function.icon.inactive}/>}
    // label={TabInfo.function.title}

    return (
      AppGlobal.curUserInfo.isLogin
      ?
      (
        <div className="tab_container">
          {/* <Tabbar data={AppGlobal.tabbar} onChange={this.onTabChange}/> */}

          <Tab>
            <TabBody>
              <Switch>
                <Route path={TabInfo.home.route}      component={Home} />
                <Route path={TabInfo.function.route}  component={Function} />
                <Route path={TabInfo.graph.route}     component={Graph} />
                <Route path={TabInfo.my.route}        component={My} />
              </Switch>
            </TabBody>

            <TabBar>
              <TabBarItem
                active={this.state.curTabIdx === TabInfo.home.index}
                onClick={() => {this.onTabChange(TabInfo.home.index);} }
                icon={this.state.curTabIdx === TabInfo.home.index ? <img src={TabInfo.home.icon.active}/> : <img src={TabInfo.home.icon.inactive}/>}
                label={TabInfo.home.title}
              />

              <TabBarItem
                active={this.state.curTabIdx === TabInfo.function.index}
                onClick={() => {this.onTabChange(TabInfo.function.index);} }
              >
                <TabBarIcon>
                  {this.state.curTabIdx === TabInfo.function.index ? <img src={TabInfo.function.icon.active}/> : <img src={TabInfo.function.icon.inactive}/>}
                </TabBarIcon>
                <TabBarLabel>{TabInfo.function.title}</TabBarLabel>
              </TabBarItem>

              <TabBarItem
                active={this.state.curTabIdx === TabInfo.graph.index}
                onClick={() => {this.onTabChange(TabInfo.graph.index);} }
                icon={this.state.curTabIdx === TabInfo.graph.index ? <img src={TabInfo.graph.icon.active}/> : <img src={TabInfo.graph.icon.inactive}/>}
                label={TabInfo.graph.title}
              />

              <TabBarItem
                active={this.state.curTabIdx === TabInfo.my.index}
                onClick={() => {this.onTabChange(TabInfo.my.index);} }
                icon={this.state.curTabIdx === TabInfo.my.index ? <img src={TabInfo.my.icon.active}/> : <img src={TabInfo.my.icon.inactive}/>}
                label={TabInfo.my.title}
              />
            </TabBar>
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