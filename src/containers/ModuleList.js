import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from '../services/ModuleServiceClient';


class ModuleList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            courseId: '0',
            module: {title: ''},
            modules:[]

        }

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);


        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);

        this.moduleServiceClient = ModuleServiceClient.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }


    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    createModule(event) {
        this.setState({module: {title: event.target.value}});
        console.log(event.target.value);
        this.moduleServiceClient
            .createModule(this.props.courseId,this.state.module)
            .then(() => { this.findAllModulesForCourse(this.props.courseId)});
    }

    findAllModulesForCourse(courseId) {
        this.moduleServiceClient
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});

        // this.findAllModulesForCourse(courseId);

    }

    setModules(modules) {
        this.setState({modules: modules})

    }



    setCourseId(courseId){
        this.setState({courseId : courseId});
    }


    deleteModule(moduleId){
        // console.log("delete module");
        // console.log(moduleId);
        // console.log(this.props.course.id);
        //
        // var crId = this.props.course.id;
        //
        this.moduleServiceClient
            .deleteModule(moduleId)
            .then(() => { this.findAllModulesForCourse(this.state.courseId)});
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {


        let modules = this.state.modules.map((module,index) => {

            return <ModuleListItem key={module.id} title={module.title} module = {this.props.course.modules[index]} moduleId={module.id} courseId={this.state.courseId} delete={this.deleteModule}/>
        })


        return modules;
    }

    render() {
        return (
            <div className="container-fluid"><br/>

                <table>
                    <tr>
                        <td className="col-10"> <input className="form-control"
                                                       onChange={this.titleChanged}
                                                       placeholder="Enter Module"/>
                        </td>
                        <td className="col-2">
                            <button onClick={this.createModule} className= "btn btn-primary btn-block">
                                <i className= "fa fa-plus"> </i>
                            </button>
                        </td>
                    </tr>
                </table><br/>
                <br/>

                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        )
    }

}

export default ModuleList;