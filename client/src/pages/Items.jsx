import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { setMyData } from "../redux/actions/setMyData";
import { useHistory } from "react-router-dom";
import { setMyItems } from "../redux/actions/setMyItems";

import NavAcc from "../components/NavBars/Navacc"
import Footer from "../components/Footer"

import style from "../common/styles/items.module.css";
import Item from "../components/Item";

import left_toggle from "../common/img/left_toggle.svg"
import right_toggle from "../common/img/right_toggle.svg"
const Items = ({ isAuth, userId }) => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const history = useHistory()

    const collectionId = history.location.pathname.slice(12)


    const dispatch = useDispatch()
    const MyItems = useSelector(state => state.mainPage.MyItems)

    const { request } = useHttp();

    useEffect(() => {
        request(`/api/my_items/${collectionId}`, 'GET',).then((res) => {
            dispatch(setMyItems(res))
        })
    }, [])

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? MyItems.length - 1 : currentSlide - 1)
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === MyItems.length - 1 ? 0 : currentSlide + 1)
    }

    console.log(MyItems.length)

    return (
        <div className={style.wrapper}>
            <NavAcc />
            <div className={style.background}></div>
            <div className={style.relative}>
                <img src={left_toggle} alt="left_toggle" className={style.left_toggle} onClick={prevSlide} />
                {MyItems.map((item, index) => {
                    return (<Item isAuth={isAuth} currentSlide={index === currentSlide ? true : false} itemData={item} />)
                })}
                <img src={right_toggle} alt="left_toggle" className={style.right_toggle} onClick={nextSlide} />
            </div>
            <div className={style.footer_wrapper}> <Footer /></div>

        </div>
    )
}

export default Items;