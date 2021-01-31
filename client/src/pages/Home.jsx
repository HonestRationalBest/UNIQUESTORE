import React, { useEffect, useState, Suspense } from "react";
import { useHttp } from "../hooks/http.hook";
import { Link } from "react-router-dom";
import { setData } from "../redux/actions/setData";
import { useDispatch, useSelector } from 'react-redux'

import Footer from "../components/Footer";
import Navlog from "../components/NavBars/Navlog";

import dark from "../common/img/dark.svg"

import style from '../common/styles/main.module.css';

const UsersCollecions = React.lazy(() => import('../components/UsersCollections'));

const Home = () => {

    const { request } = useHttp();

    const dispatch = useDispatch()
    const usersData = useSelector(state => state.mainPage.usersData)


    let data = []
    const [length, setLength] = useState(2)

    useEffect(() => {
        request(`/api/users`, 'GET').then((res) => {
            for (let i = 0; i < res.length; i++) {
                data.push(res[i])
            }
            dispatch(setData(data))
            sliceData(data, length);
        })
    }, [length])


    const sliceData = (res, length) => {
        for (let i = 0; i < length; i++) {
            if (res[i]) {
                data.push(res[i])
            }
        }
        dispatch(setData(data))
    }

    const uploadingData = () => {
        setLength(length + 2)
    }

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
                {usersData.map((user, index) => {
                    if (user.hasCollections === true) {
                        return (
                            <Suspense fallback={<div>
                                Загрузка...
                        </div>}>
                                <UsersCollecions key={user._id} img={user.img} name={user.name} id={user._id} />
                            </Suspense>
                        )
                    }
                }
                )}
                <p className={style.show}
                    onClick={uploadingData}
                >Show more</p>
            </div>
            <Footer />
        </div>
    )
}

export default Home;