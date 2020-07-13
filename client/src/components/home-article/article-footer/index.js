import React from "react";
import {Link} from "react-router-dom";

const ArticleFooter = (props) => {

    return (
        <footer>
            <div className='article__action'>
                    <Link to={`/article/${props.id}`}>
                        <button>
                        Узнать подробнее >>
                        </button>
                    </Link>
            </div>
            <ul className='article__stats'>
                <li>
                    <Link to={`/categories/${props.categories}/`}>
                        ${props.categories}
                    </Link>
                </li>
                <li>
                    <Link to='!#'>
                        <i className='icon fa-heart'/>
                        300
                    </Link>
                </li>
                <li>
                    <Link to='!#'>
                        <i className='icon fa-comment'/>
                        23
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default ArticleFooter;