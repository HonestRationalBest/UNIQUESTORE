import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMyItems } from "../redux/actions/setMyItems";
import { Link } from "react-router-dom";


import NavAcc from "../components/NavBars/Navacc"
import Footer from "../components/Footer"
import ItemAccountPage from "../components/ItemAccountPage";

import dark from "../common/img/dark.svg"
import back_to_collections from "../common/img/back_to_collections.svg"
import sorting from "../common/img/sorting.svg"

import style from "../common/styles/account.module.css";


const MyItems = () => {

    const [sortStatus, setSortStatus] = useState(false)
    const [collectionName, setCollectionName] = useState("")

    const dispatch = useDispatch()
    const MyItems = useSelector(state => state.mainPage.MyItems)

    const history = useHistory()
    const { request } = useHttp();

    const collectionId = history.location.pathname.slice(10, 37)

    const sortPopUp = () => {
        setSortStatus(!sortStatus)
    }

    useEffect(() => {
        request(`/api/my_items/${collectionId}`, 'GET',).then((res) => {
            dispatch(setMyItems(res))
        })
        request(`/api/collecion/${collectionId}`, 'GET',).then((res) => {
            console.log(res)
            setCollectionName(res[0].name)
        })
    }, [])


    return (
        <div className={style.wrapper}>
            <NavAcc />
            <div className={style.container}>
                <>
                    <div className={style.collections}>
                        <div className={style.plus_button_wrapper_item}>
                            <Link to="/my_collections">
                                <img src={back_to_collections} alt="back_to_collections" className={style.back_to_collections_img} />
                            </Link>
                            <Link to={`/create_item/${collectionId}`}><button>+</button></Link>
                            <p className={style.add_item_text}>Add item</p>
                            <p className={style.collection_name}>{collectionName}</p>
                            <p className={style.sorting_text} onClick={sortPopUp}>Sorting</p>
                            <img src={sorting} alt="sorting"
                                className={sortStatus ? `${style.rotate_sorting_image}` : `${style.sorting_image}`}
                                onClick={sortPopUp} />
                            {sortStatus &&
                                <div className={style.sort_wrapper}>
                                    <ul>
                                        <li>alphabetically</li>
                                        <li>by date added</li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className={style.collections_wrapper}>
                            {MyItems.map((item, index) => {
                                return <ItemAccountPage img={item.img} name={item.name} key={index} />
                            })}
                        </div>
                    </div>
                    <div className={style.dark1} ><img src={dark} alt="dark" /></div>
                </>
            </div>
            <Footer />
        </div>
    )
}

export default MyItems;