// import React, { Component } from 'react';
// import './tabbar.less';

// import {
//   Tab,
//   TabBarItem,
//   Article,
// } from 'react-weui';
// //import styles
// import 'weui';
// import 'react-weui/build/packages/react-weui.css';

// export default class Tabbar extends Component {
//   state = {
//   };

//   constructor(props) {
//       super(props);
//       console.log(`Tabbar constructor: props=`, props);
//   }

//   render() {
//     console.log(`Tabbar render`);

//     return (
//       <Tab
//         type="tabbar"
//         defaultIndex={this.state.curTabIdx}
//         onChange={this.onTabChange}
//       >
//         <TabBarItem icon={<img src={IconHome}/>} label="首页">
//           <Home />
//         </TabBarItem>

//         <TabBarItem icon={<img src={IconFunction}/>} label="功能">
//           <Function />
//         </TabBarItem>

//         <TabBarItem icon={<img src={IconGraph}/>} label="图表">
//           <Graph />
//         </TabBarItem>

//         <TabBarItem icon={<img src={IconMy}/>} label="我的">
//           <My />
//         </TabBarItem>
//       </Tab>
//     );
//   }
// }

// withRouter(Function);