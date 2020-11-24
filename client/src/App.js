import './App.css';
import Home from '../src/components/home/Home'
// import Student from '../src/components/student/Student'
// import Teacher from '../src/components/teacher/Teacher'
// import { Card, Button, Icon } from '@assenti/rui-components';
// import { Navbar } from 'react-bootstrap'
// import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'


// function App() {
//   return (
//     <>
//       <Card className="header" header={<h2>Online Study</h2>}>
//       </Card>
//       <div className="cantainer">
        
//           <Router>
//             <div className="menubar">
//             <div className="menu">
//               <Link exact to="/" style={{ fontSize: 20 }}>Home</Link>
//             </div>
//             <div className="menu">
//               <Link to="/teacher" style={{ fontSize: 20}}>Teacher</Link>
//             </div>
//             <div className="menu">
//               <Link to="/student" style={{ fontSize: 20 }}>Student</Link>
//             </div>
//             </div>
//             <div className="cantaint">
//               <Switch>
//                 <Route exact path="/"> <Home /></Route>
//                 <Route path="/student"> <Student /></Route>
//                 <Route path="/teacher"> <Teacher /></Route>
//               </Switch>
//             </div>


//           </Router>
        

//       </div>
//     </>

//   );
// }

import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Sidebar />
          <Route path='/' component={Main} />
        </Router>
      </div>
    )
  }
}

export default App;
