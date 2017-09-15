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

import './main.less';

import IconButton from 'assets/img/icon_nav_button.png';
import IconMsg from 'assets/img/icon_nav_msg.png';
import IconArticle from 'assets/img/icon_nav_article.png';

export default class Main extends Component {
  state = {
    // curUserInfo : EMPTY_USER_INFO,
    isNaviBarCollapse: false,
    curTabIdx: 0,
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

      this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount(){
    console.log(`Main componentDidMount`);
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
    // console.log(`Main render: this.state.curUserInfo.isLogin=${this.state.curUserInfo.isLogin}`);
    console.log(`Main render: AppGlobal.curUserInfo.isLogin=${AppGlobal.curUserInfo.isLogin}`);

    return (
      <div className="main_wrapper">
        <Tab
          type="tabbar"
          defaultIndex={this.state.curTabIdx}
          onChange={this.onTabChange}
        >
            <TabBarItem icon={<img src={IconButton}/>} label="首页">
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
            </TabBarItem>

            <TabBarItem icon={<img src={IconMsg}/>} label="功能">
              <PageHeader>功能</PageHeader>
              <Article>
                <section>
                  <h2 className="title">功能</h2>
                  <section>
                    <h3>2.1 Title</h3>
                    <p>页面2</p>
                  </section>
                </section>
              </Article>
            </TabBarItem>

            <TabBarItem icon={<img src={IconArticle}/>} label="我的">
              <PageHeader>我的</PageHeader>
              <Article>
                <section>
                  <h2 className="title">我的</h2>
                  <section>
                    <h3>3.1 Title</h3>
                    <p>页面3</p>
                  </section>
                </section>
              </Article>
            </TabBarItem>
        </Tab>

      </div>
    );
  }
}

withRouter(Main);