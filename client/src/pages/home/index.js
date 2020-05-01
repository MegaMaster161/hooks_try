import React from 'react';
import HomeArticle from "../../components/home-artical";
import AsideIntro from "../../components/aside-intro";
import './index.css';
import AsidePost from "../../components/aside-posts";

const Home = () => {
  return (
            <div className="row justify-content-center wrapper">
                <div className="col-9">
                    <HomeArticle/>
                    <HomeArticle/>
                    <HomeArticle/>
                </div>
                <div className="col-3 aside__left">
                    <AsideIntro/>
                    <br/>
                    <AsidePost/>
                </div>
            </div>

  );
};

export default Home;