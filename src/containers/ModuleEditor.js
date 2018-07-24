import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import LessonTabs from './LessonTabs';
import LessonEditor from './LessonEditor';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class ModuleEditor extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            courseId : '',
            moduleId : '',
            moduleTitle: ''
        };

        this.moduleServiceClient = ModuleServiceClient.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectModuleTitle = this.selectModuleTitle.bind(this);
        this.findModuleById = this.findModuleById.bind(this);
    }

    componentDidMount(){

        this.selectCourse(this.props.match.params.courseId);
        this.selectModule(this.props.match.params.moduleId);
        this.findModuleById(this.props.match.params.moduleId);

    }

    componentWillReceiveProps(newProps){

        this.selectCourse(newProps.match.params.courseId);
        this.selectModule(newProps.match.params.moduleId);
        this.findModuleById(newProps.match.params.moduleId);
    }

    findModuleById(moduleId){
        this.moduleServiceClient.findModuleById(moduleId)
            .then((module) => {
                console.log(module.title);
                this.selectModuleTitle(module.title);
            });

    }

    selectModuleTitle(moduleTitle){
        this.setState({moduleTitle : moduleTitle });
    }

    selectCourse(courseId){
        this.setState({courseId : courseId });
    }

    selectModule(moduleId){
        this.setState({moduleId : moduleId });
    }

    render() { return (
        <Router>
        <div>
            <h3>Module: {this.state.moduleTitle}</h3>

            <div className="row col-8">

                <LessonTabs courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId}/>

            </div>

            <div className="col-8">

                <Route exact path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}>
                </Route>

            </div>
        </div>
        </Router>
    );}
}