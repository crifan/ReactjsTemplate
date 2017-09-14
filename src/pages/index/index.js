import React, { Component } from 'react';
import { ROUTE_PREFIX, EMPTY_USER_INFO } from 'common/define';
import { withRouter, Redirect } from 'react-router-dom';
import AppGlobal from 'common/app-global';

export default class Index extends Component {
  // state = {
  //   curUserInfo : EMPTY_USER_INFO
  // };

  constructor(props) {
    super(props);
    console.log(`Index constructor`);
    console.log(this.props);
    
    // this.loginCallback = this.loginCallback.bind(this);
  }

  // loginCallback(returnedUserInfo){
  //   console.log(`Index loginCallback`);
  //   console.log(returnedUserInfo);

  //   this.setState({ curUserInfo : returnedUserInfo});
  //   console.log(this.state.curUserInfo);
  // }

  render() {
    // console.log(`Index render: this.state.curUserInfo.isLogin=${this.state.curUserInfo.isLogin}`);
    console.log('Index render: curUserInfo=', AppGlobal.curUserInfo);
    
    return (
      AppGlobal.isLogin
      ?
      <Redirect to={
        {
          pathname: ROUTE_PREFIX.WELCOME
        }
      }/>
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