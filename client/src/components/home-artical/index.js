import React from "react";
import './home-article.css';
import ArticleHeader from "./article-header";
import ArticleBody from "./article-body";
import ArticleFooter from "./article-footer";


const HomeArticle = () => {
    return (
    <article>
        <ArticleHeader/>
        <ArticleBody/>
        <ArticleFooter/>
    </article>
    );
};

export default HomeArticle;