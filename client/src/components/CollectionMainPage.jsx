import React from "react";
import { Link } from "react-router-dom";

import style from "../common/styles/common_el.module.css";

const CollectionMainPage = ({ colName, colDate, img, id }) => {

    return (
        <div>
            <Link to={`/collection/${id}`}>
                <div className={style.wrapper_main}>
                    <header className={style.header_main}><img src={img} alt="img" /></header>
                    <div className={style.contant_wrapper_main}>
                        <div className={style.flex_wrapper}>
                            <p>{colName}</p>
                        </div>
                        <p className={style.date}>{colDate.slice(0, 10)}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CollectionMainPage;