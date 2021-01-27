import React from "react";

import dots from "../common/img/dots.svg"

import style from "../common/styles/common_el.module.css";


const Collection = ({ collection }) => {
    return (
        <div className={style.wrapper}>
            <header className={style.header}></header>
            <div className={style.contant_wrapper}>
                <div className={style.flex_wrapper}>
                    <p>{collection.name}{""}</p>
                    <img src={dots} alt="dots" />
                </div>
                <p className={style.date}>{collection.date}</p>
            </div>
        </div>
    )
}

export default Collection;