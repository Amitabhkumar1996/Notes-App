import React,{Component} from 'react'
import Login from '../login/Login'
import Registration from '../registration/Registration'
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom'

class Student extends Component{
    render(){
        return(
            <>

                <div className="menu">
                   
                <Router>
                        <Link to='/student/login'>Login</Link>
                        <Link to= '/student/registration'>Sinup</Link>
                </Router>
                    
                </div>
            </>
        )
    }
}

export default Student