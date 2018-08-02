import React from 'react';

export const Paragraph = ({widget, preview, paragraphTextChanged,widgetNameChanged}) => {

    let paragraphText
    let paragraphTitle

    return (
        <div>
            <div hidden={preview}>

                <br/>
                <textarea className="form-control" onChange={() => paragraphTextChanged(widget.id, paragraphText.value)}
                          value={widget.text} placeholder="Paragraph Text"
                          ref={node => paragraphText = node}/>
                <br/>
                <input className="form-control" onChange={() => widgetNameChanged(widget.id, paragraphTitle.value)}
                       value={widget.widgetName} placeholder="Widget Name"
                       ref={nod => paragraphTitle = nod}/>
                <br/>
                <h3>Preview</h3>
            </div>
            {widget.text != null && widget.text != "" && widget.text != "Paragraph Text" && <p>{widget.text}</p>}
        </div>

    )
}