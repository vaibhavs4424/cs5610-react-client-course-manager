import React from 'react';

export const List = ({widget, preview, headingTextChanged,listTypeChanged,widgetNameChanged}) => {

    let listWidgetType
    let listWidgetText
    let listWidgetName

    return (
        <div>
            <div hidden={preview}>
                <br/>
                <textarea className="form-control" onChange={() => headingTextChanged(widget.id, listWidgetText.value)}
                          value={widget.text}
                          ref={node => listWidgetText = node} placeholder="Enter one list item per line"/>
                <br/>
                <select className="form-control" onChange={() => listTypeChanged(widget.id, listWidgetType.value)}
                        ref={node => listWidgetType = node}
                        value={widget.listType} defaultValue="Unordered">
                    <option value="Ordered">Ordered List</option>
                    <option value="Unordered">Unordered List</option>
                </select>
                <br/>
                <input className="form-control" onChange={() => widgetNameChanged(widget.id, listWidgetName.value)}
                       value={widget.widgetName} placeholder="Widget Name"
                       ref={nod => listWidgetName = nod}/>
                <br/>
                <h3>Preview</h3>
            </div>
            {widget.listType=='Ordered' && <ol>{ widget.text.split("\n").map(eachLine => (
                <li key={eachLine}>{eachLine}</li>
            ))}</ol>}
            {widget.listType=='Unordered' && <ul>{ widget.text.split("\n").map(eachLine => (
                <li key={eachLine}>{eachLine}</li>
            ))}</ul>}
        </div>

    )
}