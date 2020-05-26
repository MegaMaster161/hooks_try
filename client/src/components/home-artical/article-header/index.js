import React from "react";
import {Link} from "react-router-dom";

const ArticleHeader = (props) =>{

console.log('propsHeaderArticle', props);

    return (
        <header className='article__header'>
            <section className='article__title'>
                <h2>
                <Link to={`/article/${props.id}`}>
                    {props.title}
                </Link>

                </h2>
                <p>
                    {props.meta}
                </p>
            </section>
            <section className='article__title-meta'>

                <a href='!#' className='article__title-author'>
                    <span className='name'>
                         <img
                             className='article__title-avatar'
                             src={`/img/${props.id}.jpg`}
                             alt='author'/>
                            <br/>
                        {props.owner}
                        <br/>

                    </span>
                </a>
                <time className='published'>
                    {props.createdAt}
                </time>
            </section>
        </header>
    );
};

export default ArticleHeader;