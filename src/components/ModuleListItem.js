import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class ModuleListItem extends Component {

    constructor(props) {
        super(props);
        this.delModule = this.delModule.bind(this);
    }


    delModule(event){
        console.log(event.target.value);
        console.log(this.props.moduleId);
        this.props.delete(this.props.moduleId);
    }

    render(){
        return  (<li className="list-group-item list-group-item-dark">
                <Link to= {`/course/${this.props.courseId}/module/${this.props.moduleId}`}>
                    {this.props.title}
                </Link>
                <span className="float-right">
                <button id={this.props.courseId} onClick={this.delModule} type="button" className="btn btn-danger">
                    <i className="fa fa-trash"></i>
                </button>
              </span>
            </li>
        );
    }
}

export default ModuleListItem;