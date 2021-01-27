import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setData } from "../redux/actions/setData";

import Footer from "../components/Footer";
import Navlog from "../components/NavBars/Navlog";
import UsersCollecions from "../components/UsersCollections";

import dark from "../common/img/dark.svg"

import style from '../common/styles/main.module.css';

const Home = () => {

    const dispatch = useDispatch()

    const { request } = useHttp();

    let data = []
    const [length, setLength] = useState(2)

    const [currentData, setCurrentData] = useState([])


    const sliceData = (res, length) => {
        for (let i = 0; i < length; i++) {
            data.push(res[i])
        }
        setCurrentData(data)
    }

    const uploadingData = () => {
        setLength(length + 2)
    }

    useEffect(() => {
        request('/api/users', 'GET').then((res) => {
            sliceData(res, length);
            dispatch(setData(res))
        })
    }, [request, length])

    const allCollections = currentData.map((user, index) => {
        return (<UsersCollecions key={user._id} collections={user.collections} username={user.name} />)
    }
    );

    return (
        <div className={style.wrapper}>
            <header>
                <Navlog />
                <div className={style.container}>
                    <div className={style.offer}>
                        <p>In search of the incredible</p>
                        <Link to="/signin"><button className={style.reg}>Sign in</button></Link>
                    </div>
                    <div className={style.theme}>
                        <img src={dark} alt="dark" />
                    </div>
                </div>
            </header>
            <div className={style.description}>
                <div className={style.container}>
                    <div className={style.text_wrapper}>
                        <p>We created this app for ...</p>
                        <p className={style.text_border}>This app is created for you.
                        Share your incredible collections with other people.
                        Finds original and unusual items.
                        Believe in the power of creativity and intelligence.
                        Create your first collection right now.</p>
                    </div>
                </div>
            </div>
            <div className={style.collections_wrapper}>
                <div className={style.container}>
                    <p className={style.collection_title}>Collections</p>
                </div>
                {allCollections}
                <p className={style.show} onClick={uploadingData}>Show more</p>
            </div>
            <Footer />
        </div>
    )
}

export default Home;