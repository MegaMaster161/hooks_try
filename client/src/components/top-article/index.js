import React from "react";
import './index.css';

const TopArticle = (props) => {

    return (
        <section className="top-article">
        <figure className="effect-lily">
            <img src="/img/djigan.jpg" alt="img01"/>
            <figcaption>
                <h2>Новая <span>письня</span></h2>
                <p>Про хавчик</p>
                <a href="!#">Подробнее</a>
            </figcaption>
        </figure>
        </section>
    )
}
export default TopArticle;