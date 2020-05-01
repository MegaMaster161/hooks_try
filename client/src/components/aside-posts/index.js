import React from "react";
import './index.css';

const AsidePost = (props) => {

    return (
        <div className="card card__block">
            <img className="card-img-top" src="img/pic04.jpg" alt=""/>
                <div className="card-body">
                    <p className="card-text"><a href='#!'>Заголовок новости.</a></p>

                </div>
        </div>
    );
};
export  default AsidePost;