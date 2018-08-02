
import React from 'react';

export const Image = ({widget, preview, imageUrlChanged,widgetNameChanged}) => {

    let imageText
    let imageURL

    return (
        <div>
            <div hidden={preview}>
                <br></br>
                <input className="form-control" onChange={() => imageUrlChanged(widget.id, imageURL.value)}
                       value={widget.imageSrc} placeholder="Image URL"
                       ref={node => imageURL = node}/>
                <br></br>
                <input className="form-control" onChange={() => widgetNameChanged(widget.id, imageText.value)}
                       value={widget.widgetName} placeholder="Widget Name"
                       ref={nod => imageText = nod}/>

                <h3>Preview</h3>
            </div>
            {widget.imageSrc != null && widget.imageSrc != "" && widget.imageSrc != "Image URL" && <img className="img-thumbnail" src={widget.imageSrc} alt={widget.widgetName} />}
        </div>

    )
}