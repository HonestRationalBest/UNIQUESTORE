import React from "react";
import style from "../common/styles/items.module.css";


const Items = () => {

    return (
        <div className={style.one_comment_wrapper}>
            <p className={style.username}>Username 12.10.2021</p>
            <p>Lorem ipsum, or lipsum as it is sometimes known,
            is dummy text used in laying out print, graphic or web designs.
            The passage is attributed to an unknown typesetter in the 15th century who.</p>
        </div>
    )
}

export default Items;