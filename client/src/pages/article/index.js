import React from "react";
import './index.css';

import HomeArticle from "../../components/home-artical";

const Article = (props) => {


    return (
        <HomeArticle
            match = {props.match}
            article={null}
        />
    );
};

export default Article;