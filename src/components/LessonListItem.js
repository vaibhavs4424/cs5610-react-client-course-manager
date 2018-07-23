import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LessonListItem extends Component{

    constructor(props) {
        super(props);
        this.deleteLesson = this.deleteLesson.bind(this);
    }

    deleteLesson(event){
        this.props.delete(this.props.lessonId);
    }

    render(){

        return  (<li className="list-group-item">
            <span>
                <Link to= {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}`}>
                    {this.props.title+" "}
                </Link>

                <button id={this.props.courseId} onClick={this.deleteLesson} type="button" className="btn btn-danger fa fa-trash">
                </button>

                </span>
            </li>
        );

    }
}