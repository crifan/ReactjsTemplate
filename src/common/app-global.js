/**
 * Global data/functions/variables to share accross application
 * v2017.08.28
 */
import { EMPTY_USER_INFO } from './define';
import { urlEncodeParam } from 'lib/httpHelper';

class AppGlobal {
  curUserInfo = EMPTY_USER_INFO;

  constructor() {

    // // for debug
    // this.curUserInfo = {
    //   isLogin: true,
    //   account: 'crifan',
    //   password: '111111',
    //   name: '李茂',
    //   loginTime: new Date()
    // };

    console.log(`AppGlobal constructor`, this.curUserInfo);
  }

  logout(){
    console.log('AppGlobal: curUserInfo=', this.curUserInfo);

    this.curUserInfo = EMPTY_USER_INFO;
  }

  ServerApi = {
    // Production Server
    // www root: 
    Prod : '',
  
    // Development Server
    // www root: 
    Dev : 'http://61.152.249.210:8080/rse-oracle',
  
    // Local Test Server
    LocalTest : ''
  };
  
  // ApiRoot = this.ServerApi.Prod;
  ApiRoot = this.ServerApi.Dev;
  // ApiRoot = this.ServerApi.LocalTest;

  // Note:
  // if error: No Access-Control-Allow-Origin header is present on the requested resource
  // solution:
  // disable CORS
  // (1) Chrome: install plugin and MAKESURE enable it to work
  // https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
  // (2) Safari
  // in development mode, Development -> Disable CORS
  fetch(path, paramDict = {}, callback){
    console.log('AppGlobal fetch: path=', path,
      ' ,paramDict=', paramDict,
      ' ,callback=', callback);

    const CommonHeaders = {
      contentType : {
        xWwwFormUrlencoded: 'application/x-www-form-urlencoded; charset=UTF-8',
        applicationJson: 'application/json',
      },
      accept: {
        applicationJson: 'application/json',
      }
    }

    // process common param
    // for POST add default Content-Type and Accept
    if (paramDict.method === 'POST') {
      // console.log(`before POST: paramDict=${JSON.stringify(paramDict)}`);
      if (!paramDict.headers || (paramDict.headers && !(paramDict.headers['Content-Type']))) {
        if (paramDict.headers) {
          paramDict.headers['Content-Type'] = CommonHeaders.contentType.applicationJson;
        } else {
          paramDict.headers = {
            'Content-Type' : CommonHeaders.contentType.applicationJson
          }
        }
      }

      if (!paramDict.headers || (paramDict.headers && !(paramDict.headers['Accept']))) {
        if (paramDict.headers) {
          paramDict.headers['Accept'] = CommonHeaders.accept.applicationJson;
        } else {
          paramDict.headers = {
            'Accept' : CommonHeaders.accept.applicationJson
          }
        }
      }

      console.log('after add default: paramDict=', paramDict);
    }

    console.time(path);
    return fetch(this.ApiRoot + path, paramDict)
      .then(
        (resp) => {
          let respJsonDict = resp.json();
          console.log('resp=', resp, ' ,respJsonDict=', respJsonDict);
          return respJsonDict;
        }
      )
      .catch(
        (parseJsonErr) => {
          console.log(`parse response to json err=`, parseJsonErr);
          return {
            code: -9999,
            message: parseJsonErr
          };
        }
      )
      .then((respJsonDict) => {
        console.timeEnd(path);

        //TOOD: add common detect error
        if (callback){
          console.log('callback respJsonDict=', respJsonDict);
          callback(respJsonDict);
        }
      });

  }

}

export default (new AppGlobal);