import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class TopicListItem extends Component{

    constructor(props) {
        super(props);
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    deleteTopic(event){
        this.props.delete(this.props.topicId);
    }

    render(){
        return  (

            <li className="nav-item"><a data-toggle="tab" className="nav-link active">
                     <span >
                          <Link to= {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topicId}`}>
                         {this.props.title+" "}
                          </Link>
                         <button onClick={this.deleteTopic} type="button" className="btn btn-danger fa fa-trash">
                    </button></span>
            </a></li>

        );
    }
}