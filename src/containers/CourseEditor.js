import React,{ Component } from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import CourseServiceClient from "../services/CourseServiceClient";
import ModuleList from './ModuleList';
import ModuleEditor from './ModuleEditor';

class CourseEditor extends React.Component{

    constructor(props){
        super(props);
        this.state = {courseId : '',
            courseTitle:'',
            moduleIndex:0,
            course: {
                modules: [{
                    title: '',
                    lessons: [{
                        title: '',
                        topics: [{
                            title: ''
                        }]
                    }]
                }]
            }
        };
        this.courseService = CourseServiceClient.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.setCourseNew = this.setCourseNew.bind(this);
        this.updateModuleIndex = this.updateModuleIndex.bind(this);

    }
    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
        console.log(this.props.match.params.courseId);
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then((course) => {
                console.log(course);
               this.setCourseNew(course);
            });
    }

    setCourseNew(course){
        console.log(course);
        this.setState({course:course});
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    updateModuleIndex(moduleIndex){
        this.setState({moduleIndex:moduleIndex});
    }

    render() { return (
        <Router>
            <div>
                <h3>Course: {this.state.course.title} </h3>
                <div className="row">
                    <div className="col-4">
                        <ModuleList course={this.state.course} courseId={this.state.courseId} updateModuleIndex = {this.updateModuleIndex}/>
                    </div>
                    <div className="col-8">

                        <Route exact path="/course/:courseId/module/:moduleId" module={this.state.course.modules[this.state.moduleIndex]} component={ModuleEditor}>
                        </Route>

                    </div>
                </div>
            </div>
        </Router>
    );}}

export default CourseEditor;