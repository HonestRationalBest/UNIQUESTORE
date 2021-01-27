import React from "react";

import linkedin from "../common/img/in.svg"
import inst from "../common/img/inst.svg"
import telegram from "../common/img/telegram.svg"

import style from '../common/styles/main.module.css';

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.container}>
                <div className={style.footer_wrapper}>
                    <p>©2021 All Rights Reserved</p>
                    <div className={style.footer_icons}>
                        <div><a href="https://www.linkedin.com/in/pavel-korshun-29826a1b4/"><img src={linkedin} alt="in" /></a></div>
                        <div><a href="https://www.instagram.com/honest__rational__best/?hl=ru"><img src={inst} alt="inst" /></a></div>
                        <div><a href="@elpablo132"><img src={telegram} alt="telegram" /></a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;