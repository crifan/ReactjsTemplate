
/**
 * Http related Helper
 * v2017.08.28
 */

  //convert json dict to url encoded string
  //eg: currTime=2017-07-28&orgCode=SK316005
  export function urlEncodeParam(paramDict) {
    let encodedParamStr = Object.keys(paramDict).map((eachKey) => {
      return encodeURIComponent(eachKey) + '=' + encodeURIComponent(paramDict[eachKey]);
    }).join('&');
    console.log('urlEncodeParam -> ', encodedParamStr);
    return encodedParamStr;
  }
 