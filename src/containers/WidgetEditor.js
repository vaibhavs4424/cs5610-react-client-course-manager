import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { widgetReducer} from "../reducers/WidgetReducer";
import {WidgetApp} from "./WidgetLists";


let store = createStore(widgetReducer)

class WidgetEditor extends Component {


    constructor(props){
        super(props);
        this.state = {
            topicId:''
        };

    }

    componentDidMount(){
        this.setState({
            topicId: this.props.match.params.topicId})
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            topicId: newProps.match.params.topicId})
    }


    getDerivedStateFromProps(){
        this.setState({
            topicId: this.props.match.params.topicId})
    }




    render() {
        let tId = this.state.topicId;
        return (
            <Provider store={store}>
                <WidgetApp topicId={tId}/>
            </Provider>
        )
    }
}


export default WidgetEditor;
