import {Component} from "react";
import {addWidget, findAllWidgets, save,preview} from "../actions/actions";
import {connect} from "react-redux";
import React from 'react';
import {WidgetContainer} from "../components/Widget";

let newTopicId
class WidgetList extends Component {

    constructor(props){
        super(props)
        newTopicId = this.props.topicId
    }


    componentDidMount(){
        newTopicId=this.props.topicId;
        this.props.findAllWidgets()
    }

    componentWillReceiveProps(newProps){
        if(newProps.topicId != newTopicId){
            {
                newTopicId=newProps.topicId;
                this.props.findAllWidgets()
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="form-control border-0">
                <button className="btn btn-success col-lg-5" hidden={this.props.previewMode} onClick={this.props.save}>Save</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-dark col-lg-5" onClick={this.props.preview}>Preview</button>
                </div>
                <ul className="list-group">
                    {this.props.widgets.map(widget => (
                        <WidgetContainer preview={this.props.previewMode} widget={widget} key={widget.id}/>
                    ))}
                </ul>

                <div className="form-control border-0">
                <button className="btn btn-primary col-lg" onClick={e => (
                    this.props.addWidget()
                )}>ADD NEW WIDGET
                </button>
                </div>
            </div>
        )
    }
}


const stateToPropertiesMapper = (state) => (
    {
        widgets : state.widgets,
        previewMode: state.preview
    }
)


const dispatchToPropsMapper = dispatch => ({
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch,newTopicId),
    findAllWidgets: () => findAllWidgets(dispatch,newTopicId),
    preview: () => preview(dispatch)
})

export const WidgetApp = connect(stateToPropertiesMapper, dispatchToPropsMapper)(WidgetList)

