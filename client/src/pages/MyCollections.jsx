import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setMyCollections } from "../redux/actions/setMyCollections";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";

import NavAcc from "../components/NavBars/Navacc"
import Footer from "../components/Footer"
import NavPanel from "../components/NavBars/NavigationPanel";
import Collection from "../components/Collection";

import dark from "../common/img/dark.svg"

import style from "../common/styles/account.module.css";

const MyCollections = ({ userId }) => {

    const { request } = useHttp()
    const dispatch = useDispatch()
    const collections = useSelector(state => state.mainPage.collections)
    useEffect(() => {
        request(`/api/my_collections/${userId}`, 'GET',).then((res) => {
            console.log(res)
            dispatch(setMyCollections(res))
        })
    }, [])


    return (
        <div className={style.wrapper}>
            <NavAcc />
            <NavPanel />
            <div className={style.container}>
                {collections ?
                    <>
                        <div className={style.collections}>
                            <div className={style.plus_button_wrapper}>
                                <Link to="/create_collection"><button>+</button></Link>
                                <p>Add collection</p>
                            </div>
                            <div className={style.collections_wrapper}>
                                {collections.map((collection, index) => {
                                    return <Collection collection={collection} key={index} />
                                })}
                            </div>
                        </div>
                        <div className={style.dark1} ><img src={dark} alt="dark" /></div>
                    </>
                    :
                    <div className={style.contant}>
                        <p>You don't have any collections</p>
                        <Link to="/create_collection"><button>Create</button></Link>
                        <div className={style.contant_img}><img src={dark} alt="dark" /></div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default MyCollections;