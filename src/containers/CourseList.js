import React from 'react';

import CourseService from "../services/CourseService";
import CourseRow from "../components/CourseRow";

class CourseList extends React.Component {

    constructor() {
        super();
        this.courseService = CourseService.instance;

        this.state = {
            course : {title : '',
                created: null,
                modified: null},
            courses : []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.findAllCourses = this.findAllCourses.bind(this);
    }

    componentDidMount() {
        console.log('Hello');
        this.findAllCourses();
    }
    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses})
            })
    }

    deleteCourse(coruseId){
        this.courseService
            .deleteCourse(coruseId)
            .then(() => { this.findAllCourses()});
    }

    renderCourseRows() {
        let  courses = this.state.courses.map((course) => {
                return (
                    <CourseRow key={course.id} course={course} delete={this.deleteCourse}/>
                )
            }
        );

        return courses;

    }

    titleChanged(event) {
        this.setState({
            course: {
                title: event.target.value,
                created: new Date(),
                modified: new Date()}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });
    }

render() {
    return (

        <div>
            <table className="table">
                <tr>
                    <td><input onChange={this.titleChanged} className="form-control" id="titleFld"
                               placeholder="WebDev"/></td>
                    <td><button onClick={this.createCourse} className="btn btn-primary fa fa-plus"></button></td>
                </tr>
            </table>
            <table className="table">
                <thead>
                <tr><th>Title</th>
                    <th>
                        Owner
                    </th>
                    <th>
                        Last Modified
                    </th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.renderCourseRows()}
                </tbody>
            </table>
        </div>

    )
}
}

export default CourseList;