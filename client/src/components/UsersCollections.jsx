import React, { useEffect, Suspense } from "react";
import Carousel from 'react-elastic-carousel';
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from 'react-redux'


import ava from "../common/img/ava.svg"

import style from '../common/styles/main.module.css';
import { setUsersCollections } from "../redux/actions/setUsersCollecitons";

const CollectionMainPage = React.lazy(() => import('../components/CollectionMainPage'));


const UsersCollecions = ({ img, name, id }) => {

    const { request } = useHttp();

    const dispatch = useDispatch()
    const UsersCollections = useSelector(state => state.mainPage.UsersCollections)

    useEffect(() => {
        request(`/api/my_collections/${id}`, 'GET').then((res) => {
            dispatch(setUsersCollections(res))
        })
    }, [])



    const breakPoints = [
        { width: 1, itemsToShow: 3, },
        { width: 550, itemsToShow: 3, },
        { width: 768, itemsToShow: 3, },
        { width: 1200, itemsToShow: 3, }
    ];

    return (
        <div className={style.users_collections}>
            <div className={style.container}>
                <div className={style.user}>
                    <img src={img || ava} alt="ava" />
                    <p>{name}</p>
                </div>
                <div className={style.users_collections_wrapper}>
                    <Carousel breakPoints={breakPoints}>
                        {UsersCollections.map((collection, index) => {
                            return (
                                <Suspense
                                    fallback={<div>
                                        Загрузка...
                                    </div>}>
                                    <CollectionMainPage key={index}
                                        colName={collection.name}
                                        colDate={collection.date}
                                        img={collection.img}
                                        id={collection._id} />
                                </Suspense>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default UsersCollecions;