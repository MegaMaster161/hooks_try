import React, {useState, useRef, useEffect} from 'react';
import { Editor } from 'react-draft-wysiwyg';
//import {convertFromRaw, Editor} from 'draft-js';
import { EditorState, convertToRaw } from 'draft-js';
import './index.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useFetch from "../../hooks/useFetch";
import {convertToHTML} from "draft-convert";



const AddArticle = (props) =>{

    /**
     * Объявляем кастомный хук useFetch()
     * через деструктуризацию объявляем состояние и функции
     * isLoading {boolean} - метод объявляющий о запуске fetch запроса
     * error {string} - возвращет тело ответа, если произошла ошибка
     * response {object} - ответ от сервера
     * clearError {function} - метод очищающий ошибки.
     * doFetch {function} - обёртка над fetch
     */

    const [{isLoading, error, response, clearError}, doFetch] = useFetch();

    /**
     * Состояния  полей
     */

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [isActive, setIsActive] = useState(true);
    const [pathOfUploadTitlePhoto, setPathOfUploadTitlePhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [meta, setMeta] = useState('');
    const [isImgTitle, setIsImgTitle] = useState(false);
    let inputFile = useRef();
    const storeEditor = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log(JSON.parse(storeEditor));

    /**  Конец блока состояний. */


    /**
     * Обратывает событие отправки формы.
     * Планирую использовать formik для работы с формами.
     * @param e
     */
    const handlerSubmit = e =>{
        e.preventDefault();
        const bodyResponse =  JSON.stringify( { article: {
            title,
            meta,
            active: isActive,
            image: pathOfUploadTitlePhoto.path,
            body: html
            }}
    )

        const optionsFetching = {
            method: 'POST',
            headers:{
                "Content-Type" : 'application/json;charset=utf-8'
            },
            body: bodyResponse
        }

        doFetch("/api/v1/article/", optionsFetching);

    }

    /** Конец блока обработки событий отправки окончательной формы   */

    /**
     * Функция загрузки картинки для статьи или новости.
     * Обрабатывает функцию нажатие кнопки upload.
     * в дальнейшем планирую Cropper вкрутить как фичу и загрузку массива картинок.
     * @param event - входное событие addEventListener(onClick)
     */

    const handlerUpdate = async (event)  => {

        event.preventDefault();

        const doResponse = async () =>{
            const formUpload = new FormData();
            formUpload.append('filedata', inputFile.current.files[0]);
            console.log(inputFile)
            const optionsFetching = {
                method: 'POST',
                body: formUpload
            }

            await doFetch('/upload/', optionsFetching)

        }



     await doResponse()




    }


    useEffect(()=>{

        if(!response) {
           return
        }

        if(response.path){
            console.log('ответ от сервера', response);
            setIsImgTitle(true);
            setPathOfUploadTitlePhoto({path: response.path})
        }

        if (response.message){
            console.log(response.message);
        }



    }, [response, setPathOfUploadTitlePhoto, setIsImgTitle]);

    console.log("1111",pathOfUploadTitlePhoto)
    console.log("Имя статьи", title)
    console.log("Мета", meta)
    console.log("set active", isActive)
    const html = convertToHTML(editorState.getCurrentContent());
 //   const html = editorState ? () => EditorState.createEmpty(): convertToHTML(editorState.getCurrentContent());
    console.log(html);

    return (
            <article>
                <div className="col-9">

                    <form onSubmit={handlerUpdate}>
                        <label>
                            {!isImgTitle && (
                                <input
                                    type="file"
                                    ref={inputFile}
                                />
                            )}
                            {isImgTitle? 'Загружено':'Ожидает загрузки'}
                        </label>
                        <button type="submit">Загрузить фото</button>
                    </form>
                <form onSubmit={handlerSubmit}>
                    <fieldset>
                        Название статьи
                           <input
                            type="title"
                            id="title"
                            className="form-control"
                            placeholder="Введите название"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        Мета данные для SEO
                        <input
                            type="meta"
                            id="meta"
                            className="form-control"
                            placeholder="введите ключевые слова"
                            onChange={e => setMeta(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>
                            Показать новость?
                            <input onChange = {()=>
                                setIsActive(!isActive)
                            } type='checkbox'  checked={isActive}/>
                        </label>
                    </fieldset>
                    <fieldset>
                <Editor
                   editorState = {editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={setEditorState}
                />
                    </fieldset>

                    <button type="submit">Отправить</button>
                </form>
                </div>


            </article>
  )
};

export default AddArticle;