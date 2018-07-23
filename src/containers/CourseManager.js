import React,{ Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';

export default class CourseManager extends Component{

    render(){
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Course Manager</h1>

                    <Link to="/courses">Navigate to Courses</Link>
                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                   <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}