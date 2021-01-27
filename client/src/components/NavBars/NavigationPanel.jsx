import React from "react";
import { NavLink } from "react-router-dom";

import style from "../../common/styles/account.module.css";

const NavPanel = () => {
    return (
        <div className={style.navigation_wrapper}>
            <div className={style.container}>
                <div className={style.nav}>
                    <ul>
                        <li><NavLink to="/my_account" activeStyle={{
                            textDecoration: "underline",
                        }}>Profile</NavLink></li>
                        <li><NavLink to="/my_collections" activeStyle={{
                            textDecoration: "underline",
                        }} > My collections</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavPanel;