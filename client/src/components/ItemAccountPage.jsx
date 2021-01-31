import React from "react";

import style from "../common/styles/common_el.module.css";


const ItemAccountPage = ({ img, name }) => {
    return (
        <div className={style.item_wrapper}>
            <img src={img} alt="item" />

            <div className={style.item_name}>
                <p>{name}s</p>
            </div>
        </div>
    )
}

export default ItemAccountPage;