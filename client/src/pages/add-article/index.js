import React, {useState} from 'react';
import './index.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const AddArticle = (props) =>{
    const [data, setData] = useState("<p>Hello from CKEditor 5!</p>")



    function createMarkup() {
        return {__html: data};
    }
    console.log(data);
    return (
        <div className="content">
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
                editor={ ClassicEditor }
                data={data}
                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    setData(editor.getData());
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const dataEditor = setData(editor.getData());

                    console.log( { event, editor, dataEditor } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }

            />

            <article>
                <div dangerouslySetInnerHTML={createMarkup()} />
            </article>

        </div>



  )
};

export default AddArticle;