import React from "react";
import './index.css';

import HomeArticle from "../../components/home-article";

const Article = (props) => {


    return (
        <HomeArticle
            match = {props.match}
            article={null}
        />
    );
};

export default Article;