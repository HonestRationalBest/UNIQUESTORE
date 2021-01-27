import React from "react";
import { Link } from "react-router-dom";

import search from "../../common/img/search.svg"

import style from '../../common/styles/reg_style.module.css';


const Navlog = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.navigation_wrapper}>
                    <div className={style.search_logo_wrapper}>
                        <div className={style.logo}><Link to="/">UNIQUESTORE</Link></div>
                        <div className={style.search}>
                            <img src={search} alt="search" />
                            <input placeholder="Search" />
                        </div>
                    </div>
                    <nav className={style.navigation}>
                        <Link to="/login">Log in</Link>
                        <ul>
                            <li>Ru</li>
                            <li>En</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navlog;