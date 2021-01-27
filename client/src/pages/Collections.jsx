import React from "react";
import { Link } from "react-router-dom";

import NavPanel from "../components/NavBars/NavigationPanel";
import Footer from "../components/Footer";
import NavAcc from "../components/NavBars/Navacc";

import dark from "../common/img/dark.svg"

import style from "../common/styles/account.module.css";

const Collections = () => {
    return (
        <div className={style.wrapper}>
            <NavAcc />
            <NavPanel />
            <div className={style.container}>
                <div className={style.contant}>
                    <p>You don't have any collections</p>
                    <Link to="/create_collection"><button>Create</button></Link>
                    <div className={style.contant_img}><img src={dark} alt="dark" /></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Collections;