import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// import axios from "axios";
// import { Notify } from "react-redux-notify";
import 'react-redux-notify/dist/ReactReduxNotify.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Test from './components/Test'

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/test' component={Test} />
        </Switch>
      </>
    )
  }
}

// withRouter gives us access to this.props.history so we can use back button
export default withRouter(App)

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

// render() {
//   return (
//     <div className="font-sans">
//       <Navbar />
//       {/* <Notify /> */}
//       <main className="px-4">
//         <h1 className="text-2xl font-bold">riders</h1>
//         {this.state.riders.map((rider, i) => (
//           <div
//             key={i}
//             className="max-w-sm bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-all transition-100 m-100"
//           >
//             <img
//               className="w-full"
//               src={rider.avatar}
//               alt="Sunset in the mountains"
//             />
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl mb-2">{rider.name}</div>
//               <div className="italic text-xs mb-2">{rider.location}</div>
//               <p className="text-gray-700 text-base">{rider.bio}</p>
//             </div>
//             <div className="px-6 py-4">
//               {rider.disciplines.map((discipline, i) => (
//                 <span
//                   key={i}
//                   className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
//                 >
//                   #{discipline}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }
