import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import TopicList from './TopicList';

export default class LessonEditor extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            courseId : '',
            moduleId : '',
            lessonId : '',
            moduleTitle: '',
            lessonTitle :'',
        };

        this.lessonServiceClient = LessonServiceClient.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.findLessonById = this.findLessonById.bind(this);
    }

    componentDidMount(){

        this.selectCourse(this.props.match.params.courseId);
        this.selectModule(this.props.match.params.moduleId);
        this.selectLesson(this.props.match.params.lessonId);
        this.findLessonById(this.props.match.params.lessonId);

    }

    componentWillReceiveProps(newProps){

        this.selectCourse(newProps.match.params.courseId);
        this.selectModule(newProps.match.params.moduleId);
        this.selectLesson(newProps.match.params.lessonId);
        this.findLessonById(newProps.match.params.lessonId);

    }

    findLessonById(lessonId){
        this.lessonServiceClient.findLessonbyId(lessonId)
            .then((lesson) => {
                console.log(lesson.title);
                this.selectLessonTitle(lesson.title);
            });

    }



    selectCourse(courseId){
        this.setState({courseId : courseId });
    }

    selectModule(moduleId){
        this.setState({moduleId : moduleId });
    }
    selectLesson(lessonId){
        this.setState({lessonId : lessonId });
    }

    selectLessonTitle(lessonTitle){
        this.setState({lessonTitle : lessonTitle });
    }

    render() { return (
            <div>
                <h3>Lesson: {this.state.lessonTitle} </h3>
                <div className="row">

                    <TopicList courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId} lessonId={this.props.match.params.lessonId}/>
                </div>
            </div>
    );}
}