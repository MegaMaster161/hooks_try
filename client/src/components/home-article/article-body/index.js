import React from "react";
//import ContentParser from "../../content-parser";


const ArticleBody = (props) =>{

    let content = () => {
        return {__html: props.body}
    }
    console.log("Тело поста", props.body);

    return (
        <React.Fragment>
            <a href='#!' className='image pick'>
                <figure className='article__img'>
                <img
                src='/img/pic.jpg'
                alt=''/>
                </figure>
            </a>
           <p>
               <div dangerouslySetInnerHTML={content()}
               />

           </p>
        </React.Fragment>
    );
};

export default ArticleBody;