import React, {useEffect, useState} from 'react';
import HomeArticle from "../../components/home-article";
import './index.css';
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader";


const Home = (props) => {

    const [{response, isLoading}, doFetch] = useFetch();


    const [page] = useState(1);
    const [articleOnPage] = useState(3);
    const apiUrl = `/api/v1/article/${page}/${articleOnPage}`;
    const [dataArray, setDataArray] = useState({});


    useEffect(()=>{
        doFetch(apiUrl, {
            method: 'get'
        })

    },[apiUrl, doFetch])

    useEffect(()=>{
        if(!response){
            return
        }
        setDataArray(response.items);
    },[response])


    return (
                <section className="content">
                        {isLoading && <Loader/>}
                        {!isLoading && response &&
                        (dataArray.map((article, idx)=>{
                              return  <HomeArticle
                                    key = {idx}
                                    article = {article}
                                    match = {props.match}
                                />
                            })
                        )}
                </section>
      );
};

export default Home;