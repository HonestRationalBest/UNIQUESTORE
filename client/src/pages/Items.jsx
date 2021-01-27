import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { setMyData } from "../redux/actions/setMyData";
import { useHistory } from "react-router-dom";

import NavAcc from "../components/NavBars/Navacc"
import Footer from "../components/Footer"

import style from "../common/styles/items.module.css";
import Item from "../components/Item";

import left_toggle from "../common/img/left_toggle.svg"
import right_toggle from "../common/img/right_toggle.svg"
const Items = ({ isAuth, userId }) => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const { request } = useHttp();
    const dispatch = useDispatch()
    const history = useHistory()
    const myData = useSelector(state => state.mainPage.myData)

    const collectionId = history.location.pathname.slice(12)

    useEffect(() => {
        request(`/api/collecion/${collectionId}`, 'GET',).then((res) => {
            // dispatch(setMyData(res))
            console.log("Res: ")
            console.log(res)
        })
    }, [])


    return (
        <div className={style.wrapper}>
            <NavAcc />
            <div className={style.background}></div>
            <div className={style.relative}>
                <img src={left_toggle} alt="left_toggle" className={style.left_toggle} />
                <Item isAuth={isAuth} />
                <img src={right_toggle} alt="left_toggle" className={style.right_toggle} />
            </div>
            <div className={style.footer_wrapper}> <Footer /></div>

        </div>
    )
}

export default Items;