import {WIDGET_GET_API_URL,ADD_WIDGET,MOVE_UP_WIDGET,LINK_URL_CHANGED,LIST_TYPE_CHANGED,PARAGRAPH_TEXT_CHANGED,IMAGE_URL_CHANGED,WIDGET_NAME_CHANGED,HEADING_TEXT_CHANGED,WIDGET_PREVIEW,HEADING_SIZE_CHANGED, FIND_ALL_WIDGETS, WIDGET_SAVE} from "../constants/constants";


export const linkUrlChanged = (dispatch,widgetId, newUrl) => (
    dispatch({type: LINK_URL_CHANGED,
        id: widgetId,
        linkHref: newUrl})
)


export const findAllWidgets = (dispatch,topicId) => {
    fetch(WIDGET_GET_API_URL.replace('TID', topicId))
        .then(response => response.json())
        .then(widgets => dispatch({
                type: FIND_ALL_WIDGETS,
                widgets: widgets
            }
        ))
}
export const moveUpWidget = (dispatch,widget) => {
    dispatch({type: MOVE_UP_WIDGET, id: widget.id, widget : widget})
}


export const addWidget = dispatch => {
    dispatch({type : ADD_WIDGET})
}

export const save = (dispatch,newTopic) => {
    dispatch({type : WIDGET_SAVE, topic: newTopic})
}


export const preview = dispatch => {
    dispatch({type : WIDGET_PREVIEW})
}



export const imageUrlChanged = (dispatch,widgetId, newUrl) => (
    dispatch({type: IMAGE_URL_CHANGED,
        id: widgetId,
        imageSrc: newUrl})
)


export const widgetNameChanged = (dispatch,widgetId, newName) => (
    dispatch({type: WIDGET_NAME_CHANGED,
        id: widgetId,
        widgetName: newName})
)




export const headingTextChanged = (dispatch,widgetId, newText) => (
    dispatch({type: HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)


export const paragraphTextChanged = (dispatch,widgetId, newText) => (
    dispatch({type: PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)





export const headingSizeChanged = (dispatch,widgetId, newSize) => (
    dispatch({type: HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize})
)



export const listTypeChanged = (dispatch,widgetId, newType) => (
    dispatch({type:  LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType})
)

