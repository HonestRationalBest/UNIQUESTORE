import React from "react";
import { Link } from "react-router-dom";
import { setMyCollections } from "../redux/actions/setMyCollections";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";

import delete_collection from "../common/img/delete_collection.svg"

import style from "../common/styles/common_el.module.css";


const Collection = ({ collection }) => {

    const { request } = useHttp()
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        request(`/api/delete_collection/${id}`, 'DELETE',).then((res) => {
            window.location.reload()
        })
    }

    return (
        <div className={style.wrapper}>
            <header className={style.header}>
                <img src={delete_collection} alt="delete_collection" onClick={() => handleDelete(collection._id)} />
            </header>
            <div className={style.contant_wrapper}>
                <p>{collection.name}{""}</p>
                <div className={style.collection_data_and_button_wrapper}>
                    <p className={style.date}>{collection.date.slice(0, 10)}</p>
                    <Link to={`/my_items/${collection._id}`}><button>see items</button></Link>
                </div>

            </div>
        </div>
    )
}

export default Collection;