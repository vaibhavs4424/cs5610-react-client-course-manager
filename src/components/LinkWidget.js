import React from 'react';

export const Link = ({widget, preview, linkUrlChanged,headingTextChanged}) => {

    let linkText
    let linkURL

    return (
        <div>
            <div hidden={preview}>
                <br/>
                <input className="form-control" onChange={() => linkUrlChanged(widget.id, linkURL.value)}
                       value={widget.linkHref} placeholder="Link URL"
                       ref={node => linkURL = node}/>
                <br/>
                <input className="form-control" onChange={() => headingTextChanged(widget.id, linkText.value)}
                       value={widget.text} placeholder="Link text"
                       ref={nod => linkText = nod}/>
                <br/>

                <h3>Preview</h3>
            </div>
            {widget.linkHref != null && widget.linkHref != "" && widget.linkHref != "Link URL" && <a href={widget.linkHref} target="_blank">{widget.text}</a>}
        </div>

    )
}