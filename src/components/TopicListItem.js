import React, {Component} from 'react';

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
                         {this.props.title+" "}
                         <button onClick={this.deleteTopic} type="button" className="btn btn-danger fa fa-trash">
                    </button></span>
            </a></li>

        );
    }
}