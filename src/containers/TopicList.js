import React from 'react';
import TopicService from "../services/TopicService";
import TopicListItem from '../components/TopicListItem';


export default class TopicList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId:'',
            lesson: {title: ''},
            topic: {title:''},
            lessons: [],
            topics:[]
        }


        this.titleChanged = this.titleChanged.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setTopics = this.setTopics.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.topicService = TopicService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }


    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId,newProps.lessonId);
    }


    setTopics(topics) {
        this.setState({topics: topics})
    }


    setCourseId(courseId){
        this.setState({courseId : courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId : moduleId});
    }

    setLessonId(lessonId){
        this.setState({lessonId : lessonId});
    }



    findAllTopicsForLesson(courseId, moduleId,lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId, moduleId,lessonId)
            .then((topics) => {this.setTopics(topics)});

    }

    deleteTopic(topicId){
        this.topicService
            .deleteTopic(topicId)
            .then(() => { this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId)});
    }

    createTopic(event) {
        this.setState({topic: {title: event.target.value}});
        console.log(event.target.value);

        this.topicService
            .createTopic(this.props.courseId,this.props.moduleId,this.props.lessonId,this.state.topic)
            .then(() => { this.findAllTopicsForLesson(this.props.courseId,this.props.moduleId,this.props.lessonId)});
    }


    renderListOfTopics() {
        let topics = this.state.topics.map((topic) =>  {
            return <TopicListItem key={topic.id} topicId={topic.id} courseId={this.props.courseId} moduleId={this.props.moduleId} title={topic.title} lessonId={this.props.lessonId}  delete={this.deleteTopic}/>
        })

        return topics;
    }


    titleChanged(event) {
        this.setState({topic: {title: event.target.value}});
        // console.log(event.target.value);
    }


    render() {
        return (
            <div>
                <br/>
                <div className="container-fluid">

                    <table className="table table-bordered table-dark">
                        <tr>
                            <td className="col-10"><input className="form-control" onChange={this.titleChanged} placeholder="Enter Topic"/></td>
                            <td className="col-2"><button onClick={this.createTopic} className= "btn btn-primary">
                                <i className= "fa fa-plus"> </i>
                            </button>
                            </td>
                        </tr>
                    </table>

                    <h3>Topic List</h3>
                    <table>
                        <tr>
                            <td>
                                <ul className="nav nav-tabs">
                                    {this.renderListOfTopics()}
                                </ul>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>


        )
    }


}