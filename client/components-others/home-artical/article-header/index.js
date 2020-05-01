import React from "react";

const ArticleHeader = (props) =>{

    return (
        <header>
            <section className='article__title'>
                <h2>
                    <a href='!#'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </a>
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, nostrum.
                </p>
            </section>
            <section className='article__title-meta'>

                <a href='!#' className='article__title-author'>
                    <span className='name'>
                         <img
                             className='article__title-avatar'
                             src='img/ava.jpg'
                             alt='author'/>
                            <br/>
                        Лазева Татьяна
                        <br/>
                        <time className='published'>
                        Сегодня
                        </time>
                    </span>


                </a>
            </section>
        </header>
    );
};

export default ArticleHeader;