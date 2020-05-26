import React from "react";


const ArticleBody = (props) =>{

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
               {props.body}
           </p>
        </React.Fragment>
    );
};

export default ArticleBody;