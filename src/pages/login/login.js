import React, { Component } from 'react';
import { stopEventPropgation } from 'lib/eventHelper';
import { ROUTE_PREFIX, EMPTY_USER_INFO } from 'common/define';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import AppGlobal from 'common/app-global';
import './login.less';
import {
  Button,
  Form,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
  FieldGroup,
  Col,
  Grid,
  // Image,
} from 'react-bootstrap';

import imgLogo from 'assets/img/logo-120x120.png';


export default class Login extends Component {
  state = {
    account: AppGlobal.curUserInfo.account,
    password: AppGlobal.curUserInfo.password,
    isLogin: AppGlobal.curUserInfo.isLogin,
  }

  constructor(props) {
    super(props);

    console.log('Login constructor',
      'props=', props,
      'props.match=', props.match,
      'props.history=', props.history,
      'props.location=', props.location,
      'props.location.state', this.props.location.state);
    // this.state.curUserInfo = this.props.location.state.curUserInfo;
    // console.log(this.state.curUserInfo);

    this.submitLogin = this.submitLogin.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    // for debug
    this.state.account = 'crifan';
    this.state.password = '111111';
    //for debug
    this.state.isLogin = false;
  }

  submitLogin(e){
    console.log('Login submitLogin: e=', e);

    //Note: here stopEventPropgation include e.preventDefault();, to prevent event propgate to browser
    // otherwise: 
    // (1) Chrome will warning: Form submission canceled because the form is not connected
    // (2) Safari will redirect to refresh page -> here will cause resource not found 404 error
    stopEventPropgation(e);

    //TODO: call API to login
    this.setState({isLogin : true});
    AppGlobal.curUserInfo.isLogin = this.state.isLogin;
    AppGlobal.curUserInfo.account = this.state.account;
    AppGlobal.curUserInfo.password = this.state.password;

    //for debug
    AppGlobal.curUserInfo = {
      isLogin: true,
      account: 'crifan',
      password: '111111',
      name: '李茂',
      loginTime: new Date()
    };

    // if (this.state.loginCallback) {
    //   // return login user info to Index
    //   this.state.loginCallback(this.state.curUserInfo);
    // }

    // if (this.props.history) {
    //   console.log(`jump to path: ${ROUTE_PREFIX.WELCOME}`);
    //   this.props.history.push(ROUTE_PREFIX.WELCOME);
    // }
  }


  onAccountChange(e){
    console.log('onAccountChange: e=', e, ' ,e.target.value=', e.target.value);
    // this.setState({
    //   curUserInfo : {
    //     account : e.target.value
    //   }
    // });

    this.setState({
      account : e.target.value
    });
  }

  onPasswordChange(e){
    console.log('onPasswordChange: e=', e, ', e.target.value=', e.target.value);
    // this.setState({
    //   curUserInfo : {
    //     password : e.target.value
    //   }
    // });

    this.setState({
      password : e.target.value
    });
  }

  getValidationState(e) {
    console.log('getValidationState: e=', e);

    const length = this.state.account.length;

    if (length > 5) {
      return 'success';
    } else if ((length > 2) && (length < 5)) {
      return 'warning';
    } else if (length < 2) {
      return 'error';
    }
  }

  render() {
    // console.log(`Login render: this.state.curUserInfo.isLogin=${this.state.curUserInfo.isLogin}`);
    console.log('Login render: AppGlobal.curUserInfo.isLogin=', AppGlobal.curUserInfo.isLogin);

    return (
      this.state.isLogin ?
      <Redirect to={
        {
          pathname: ROUTE_PREFIX.HOME
        }
      }/>
      :
      <div className="login_container">
        <div className="login_logo">
          {/* <Image src={imgLogo} responsive /> */}
          <img src={imgLogo} />
        </div>

        <div className="login_body">
          <Form>
            <FormGroup controlId="loginAccountGroup">
              <Col componentClass={ControlLabel} sm={2}>
                账号
              </Col>

              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.account}
                  placeholder="账号(5位以上数字大小写字母)"
                  onChange={this.onAccountChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="loginPasswordGroup">
              <Col componentClass={ControlLabel} sm={2}>
                密码
              </Col>

              <Col sm={10}>
                <FormControl
                  type="password"
                  value={this.state.password}
                  placeholder="请输入账号"
                  onChange={this.onPasswordChange}
                />
              </Col>
            </FormGroup>

            <Col sm={10}>
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.submitLogin}
                block
              >
                登录
              </Button>
            </Col>

          </Form>

        </div>
      </div>
    );
  }
}

// Login.contextTypes = {
//   router: PropTypes.object.isRequired
// };

// export default withRouter(Login);
withRouter(Login);