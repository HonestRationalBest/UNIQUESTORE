import React from "react";

import loader from "../common/img/loader.gif"

import style from '../common/styles/main.module.css';

const Loader = () => {
    return (
        <>
            <img src={loader} alt="loader" />
        </>
    )
}

export default Loader;