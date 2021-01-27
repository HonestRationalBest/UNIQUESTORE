import React from "react";
import { Link } from "react-router-dom";

import search from "../../common/img/search.svg"

import style from '../../common/styles/reg_style.module.css';

const NavAcc = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.navigation_wrapper}>
                    <div className={style.search_logo_wrapper}>
                        <div className={style.logo}><Link to="/home">UNIQUESTORE</Link></div>
                        <div className={style.search}>
                            <img src={search} alt="search" />
                            <input placeholder="Search" />
                        </div>
                    </div>
                    <nav className={style.navigation}>
                        <Link to="/my_account">My account</Link>
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

export default NavAcc;