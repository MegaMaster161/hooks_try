import React from 'react';
import {convertFromRaw, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const Content = (props) => {


    let storedInState;
    if (props.body === null || undefined) {
        storedInState = EditorState.createEmpty();
    } else {
        let ed = props.body
       console.log('storedState111', ed)
       storedInState = EditorState.createWithContent(convertFromRaw(ed));
    }

    return (
        <div className="readonly-editor">
            <Editor
                toolbarHidden
                editorState={storedInState}
                readOnly={true}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
            />
        </div>
    );
}

export default Content;