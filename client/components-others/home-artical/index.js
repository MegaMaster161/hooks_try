import React, {useEffect, useState} from "react";
import './home-article.css';
import ArticleHeader from "./article-header";
import ArticleBody from "./article-body";
import ArticleFooter from "./article-footer";


const HomeArticle = (props) => {
    //params for fetching pages for see users and guest



    return (
    <article>
        <ArticleHeader/>
        <ArticleBody/>
        <ArticleFooter/>
    </article>
    );
};

export default HomeArticle;