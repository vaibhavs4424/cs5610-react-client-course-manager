import React from 'react';
import { Link } from 'react-router-dom';

class CourseRow extends React.Component{

    constructor(props){
        super(props);
        this.delCourse = this.delCourse.bind(this);
    }

    delCourse(event){
        this.props.delete(this.props.course.id);
    }

    render(){

        return(
            <tr>
                <td>
                    <Link to= {`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>me</td>
                <td>{this.props.course.modified}</td>
                <td> <button id={this.props.course.id} onClick={this.delCourse} className="btn btn-danger fa fa-trash"></button></td>
            </tr>
        )

    }
}

export default CourseRow;
