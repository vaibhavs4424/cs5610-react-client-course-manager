import {DELETE_WIDGET,MOVE_UP_WIDGET,MOVE_DOWN_WIDGET,SELECT_WIDGET_TYPE} from "../constants/constants";
import {connect} from "react-redux";
import React from 'react'
import {headingSizeChanged, moveUpWidget,headingTextChanged,listTypeChanged,paragraphTextChanged,linkUrlChanged,imageUrlChanged,widgetNameChanged} from "../actions/actions";

import {Heading} from "./HeadingWidget";
import {List} from "./ListWidget";
import {Link} from "./LinkWidget";
import {Paragraph} from "./ParagraphWidget";
import {Image} from "./ImageWidget";


const stateToPropsMapper = state => ({
    preview: state.preview
})

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId,newText) => headingTextChanged(dispatch,widgetId,newText),
    linkUrlChanged: (widgetId,newUrl) => linkUrlChanged(dispatch,widgetId,newUrl),
    imageUrlChanged: (widgetId,newUrl) => imageUrlChanged(dispatch,widgetId,newUrl),
    paragraphTextChanged: (widgetId,newText) => paragraphTextChanged(dispatch,widgetId,newText),
    listTypeChanged: (widgetId,newType) => listTypeChanged(dispatch,widgetId,newType),
    headingSizeChanged: (widgetId,newSize) => headingSizeChanged(dispatch,widgetId,newSize),
    moveUpWidget: (widgetId) => moveUpWidget(dispatch,widgetId),
    widgetNameChanged: (widgetId,newName) => widgetNameChanged(dispatch,widgetId,newName),


})


const ListContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(List)
const HeadingContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Heading)
const LinkContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Link)
const ParagraphContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Paragraph)
const ImageContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Image)


const Widget =({widget,preview, dispatch}) => {

    let selectElement

    return(<li className="list-group-item">
        <div hidden={preview}>
            {/*{widget.id} {widget.text}*/}
            <div className="form-control border-0">
                <div className="float-left">
                    {widget.widgetType=='Paragraph' && <h4>Paragraph Widget</h4>}
                    {widget.widgetType=='Heading' && <h4>Heading Widget</h4>}
                    {widget.widgetType=='List' && <h4>List Widget</h4>}
                    {widget.widgetType=='Image' && <h4>Image Widget</h4>}
                    {widget.widgetType=='Link' && <h4>Link Widget</h4>}
                    &nbsp;&nbsp;
                </div>
                <div className="form-inline float-right">
                    <button className="btn btn-warning fa fa-arrow-up" onClick={e => (
                        dispatch({type: MOVE_UP_WIDGET, id: widget.id, widget : widget})
                    )}>
                    </button>
                    &nbsp;
                    <button className="btn btn-warning fa fa-arrow-down" onClick={e => (
                        dispatch({type: MOVE_DOWN_WIDGET, id: widget.id, widget : widget})
                    )}>
                    </button>
                    &nbsp;

                    <select className="form-control" value={widget.widgetType} onChange={e =>
                        dispatch({type: SELECT_WIDGET_TYPE,
                            id: widget.id,
                            widgetType: selectElement.value
                        })} ref={node => selectElement = node}>
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>List</option>
                        <option>Image</option>
                        <option>Link</option>
                    </select>
                    &nbsp;
                    <button className="btn btn-danger fa fa-trash" onClick={e => (
                        dispatch({type: DELETE_WIDGET, id: widget.id})
                    )}>
                    </button>
                </div>
            </div>
        </div>
        <div>
            {widget.widgetType=='Heading' && <HeadingContainer widget={widget}/>}
            {widget.widgetType=='Paragraph' &&<ParagraphContainer widget={widget}/>}
            {widget.widgetType=='List' &&<ListContainer widget={widget}/>}
            {widget.widgetType=='Image' &&<ImageContainer widget={widget}/>}
            {widget.widgetType=='Link' &&<LinkContainer widget={widget}/>}
        </div>
    </li>)
}


export const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)