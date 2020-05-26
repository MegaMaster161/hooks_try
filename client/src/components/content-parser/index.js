import React from 'react';
import {Editor, convertFromRaw} from 'draft-js';

const ContentParser = (props) => {

    const storedState =  convertFromRaw(JSON.parse(props.storedState));
    return (
        <div className="readonly-editor">
            <Editor editorState={storedState} readOnly={true} />
        </div>
    );
}

export default ContentParser;