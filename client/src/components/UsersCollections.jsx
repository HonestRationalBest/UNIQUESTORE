import React, { useState, useEffect } from "react";
import Carousel from 'react-elastic-carousel';
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from 'react-redux'
import { setMyCollections } from "../redux/actions/setMyCollections";

import CollectionMainPage from "./CollectionMainPage";

import ava from "../common/img/UsersAva.svg"

import style from '../common/styles/main.module.css';



const UsersCollecions = ({ img, name, id }) => {

    const { request } = useHttp();

    const dispatch = useDispatch()
    const collections = useSelector(state => state.mainPage.collections)

    useEffect(() => {
        request(`/api/my_collections/${id}`, 'GET').then((res) => {
            dispatch(setMyCollections(res))
        })
    }, [])


    const breakPoints = [
        { width: 1, itemsToShow: 3, },
        { width: 550, itemsToShow: 3, },
        { width: 768, itemsToShow: 3, },
        { width: 1200, itemsToShow: 3, }
    ];

    console.log(collections)
    return (
        <div className={style.users_collections}>
            <div className={style.container}>
                <div className={style.user}>
                    <img src={img} alt="ava" />
                    <p>{name}</p>
                </div>
                <div className={style.users_collections_wrapper}>
                    <Carousel breakPoints={breakPoints}>
                        {collections.map((collection, index) => {
                            return (<CollectionMainPage key={index}
                                colName={collection.name}
                                colDate={collection.date}
                                img={collection.img}
                                id={collection._id} />)
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default UsersCollecions;