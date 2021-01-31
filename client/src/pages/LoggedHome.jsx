import React, { useEffect, useState, Suspense } from "react";
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from 'react-redux'

import Footer from "../components/Footer";
import NavAcc from "../components/NavBars/Navacc";

import dark from "../common/img/dark.svg"

import style from '../common/styles/main.module.css';
import { setData } from "../redux/actions/setData";


const UsersCollecions = React.lazy(() => import('../components/UsersCollections'));

const LoggedHome = () => {

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
                <NavAcc />
                <div className={style.container}>
                    <div className={style.offer}>
                        <p>In search of the incredible</p>
                    </div>
                    <div className={style.theme}>
                        <img src={dark} alt="dark" />
                    </div>
                </div>
            </header>
            <div className={style.description}>
                <div className={style.opportunities}>
                    <div className={style.container}>
                        <p>Opportunities</p>
                        <div className={style.opportunities_wrapper}>
                            <div className={style.opportunity}>
                                <hr />
                                <div className={style.number}><p>01</p></div>
                                <div className={style.small_text}><p >View the profiles of other collectors</p></div>
                            </div>
                            <div className={style.opportunity}>
                                <hr />
                                <div className={style.number}><p>02</p></div>
                                <div className={style.small_text}><p >Create your own collections</p></div>
                            </div>
                            <div className={style.opportunity}>
                                <hr />
                                <div className={style.number}><p>03</p></div>
                                <div className={style.small_text}><p >Leave likes and comments</p></div>
                            </div>
                        </div>
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
                <p className={style.show} onClick={uploadingData}>Show more</p>
            </div>
            <Footer />
        </div>
    )
}

export default LoggedHome;