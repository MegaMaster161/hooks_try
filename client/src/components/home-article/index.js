import React, {useEffect, useState, Fragment} from "react";
import './home-article.css';
import ArticleHeader from "./article-header";
import ArticleBody from "./article-body";
import ArticleFooter from "./article-footer";
import useFetch from "../../hooks/useFetch";
//import Content from "../content-parser";


const HomeArticle = ({article, match})=> {


    const [{response, isLoading}, doFetch] = useFetch()
    const isArticle = match.path === '/article/:id'
    const [articleData, setArticleData] = useState({})
    console.log("Loading", isLoading);
    console.log("сос", isArticle);

    const id = articleData.id ? articleData.id :  match.params.id;
    useEffect(()=>{
        if (!isArticle) {
            setArticleData(article);
        } else {
            console.log("Идентификатор", id)
            const apiUrl = `/api/v1/article/${id}`
           setTimeout(()=>{
               doFetch(apiUrl, {
                   method: 'get'
               })
           },1000)
        }

    },[doFetch, article, isArticle, id])


    useEffect(()=>{
        if(!response){
            return
        }
        console.log("Ответ от сервера", response)
        setArticleData(response.db)

    }, [response])

    console.log("Тело в основе", articleData.body);

    return (
        <article>
            <ArticleHeader
            id          =   {id}
            title       =   {articleData.title}
            meta        =   {articleData.meta}
            owner       =   {articleData.owner}
            createdAt   =   {articleData.createdAt}
            />
            <ArticleBody
                body = {articleData.body}
            />
            }
            {!isArticle &&
            (
                 <ArticleFooter
                    categories  =   {articleData.categories}
                    id          =   {articleData.id}
                 />
            )
            }
            <p></p>
        </article>
    );
};

export default HomeArticle;