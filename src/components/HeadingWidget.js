import React from 'react';

export const Heading = ({widget, preview, headingTextChanged,headingSizeChanged}) => {

    let selectHeadingSize
    let inputHeadingText

    return (
        <div>
            <div hidden={preview}>
                <br/>
                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputHeadingText.value)}
                       value={widget.text}
                       ref={node => inputHeadingText = node}/>
                <br/>
                <select className="form-control" onChange={() => headingSizeChanged(widget.id, selectHeadingSize.value)}
                        ref={node => selectHeadingSize = node}
                        value={widget.size}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <h3>Preview</h3>
            </div>
            {widget.size==1 && <h1>{widget.text}</h1>}
            {widget.size==2 && <h2>{widget.text}</h2>}
            {widget.size==3 && <h3>{widget.text}</h3>}
        </div>

    )
}