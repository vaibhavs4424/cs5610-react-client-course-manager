import React from 'react';
import LessonService from "../services/LessonServiceClient";
import LessonListItem from '../components/LessonListItem';


export default class LessonList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        }


        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);

        this.lessonService = LessonService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }


    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }


    setLessons(lessons) {
        this.setState({lessons: lessons})
    }



    setCourseId(courseId){
        this.setState({courseId : courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId : moduleId});
    }


    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {this.setLessons(lessons)});

    }

    deleteLesson(lessonId){

        this.lessonService
            .deleteLesson(lessonId)
            .then(() => { this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)});
    }

    createLesson(event) {
        this.setState({lesson: {title: event.target.value}});
        console.log(event.target.value);

        this.lessonService
            .createLesson(this.props.courseId,this.props.moduleId,this.state.lesson)
            .then(() => { this.findAllLessonsForModule(this.props.courseId,this.props.moduleId)});
    }


    renderListOfLessons() {
        let lessons = this.state.lessons.map((lesson) =>  {
            return <LessonListItem key={lesson.id} courseId={this.props.courseId} moduleId={this.props.moduleId} title={lesson.title} lessonId={lesson.id} delete={this.deleteLesson}/>
        })


        return lessons;
    }


    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
        // console.log(event.target.value);
    }


    render() {
        return (
            <div>
                <div className="container-fluid"><br/>
                    {/*<h3>Lesson list for module: {this.state.moduleId}</h3>*/}
                    <table>
                        <tr>
                            <td className="col-10"><input className="form-control" onChange={this.titleChanged} placeholder="Enter Lesson"/></td>
                            <td className="col-2"><button onClick={this.createLesson} className= "btn btn-primary">
                                <i className= "fa fa-plus"> </i>
                            </button>
                            </td>
                        </tr>
                    </table><br/>

                    <table>
                        <tr>
                            <td>
                                <ul className="nav nav-tabs">
                                    {this.renderListOfLessons()}
                                </ul>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>


        )
    }


}