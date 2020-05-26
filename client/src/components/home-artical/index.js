import React, {useEffect, useState} from "react";
import './home-article.css';
import ArticleHeader from "./article-header";
import ArticleBody from "./article-body";
import ArticleFooter from "./article-footer";
import useFetch from "../../hooks/useFetch";


const HomeArticle = ({article, match})=> {


    const [{response}, doFetch] = useFetch()
    const isArticle = match.path === '/article/:id'
    const [articleData, setArticleData] = useState({})


    useEffect(()=>{
        if (!isArticle) {
            setArticleData(article);
        } else {
            const id = match.params.id;
            const apiUrl = `/api/v1/article/${id}`
            doFetch(apiUrl, {
                method: 'get'
            })
        }

    },[doFetch, article, isArticle, match.params.id])


    useEffect(()=>{
        if(!response){
            return
        }
        setArticleData(response.db)

    }, [response])


    return (
        <article>
            <ArticleHeader
            id          =   {articleData.id}
            title       =   {articleData.title}
            meta        =   {articleData.meta}
            description =   {articleData.description}
            owner       =   {articleData.owner}
            createdAt   =   {articleData.createdAt}
            />
            <ArticleBody
            body        =   {articleData.body}
            />
            {!isArticle &&
            (<ArticleFooter
            categories  =   {articleData.categories}
            id          =   {articleData.id}
            />)
            }
        </article>
    );
};

export default HomeArticle;