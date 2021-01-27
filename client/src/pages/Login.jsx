import React, { useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

import NavReg from "../components/NavBars/Navreg";


import dark from "../common/img/dark.svg"
import facebook from "../common/img/facebook.svg"
import linkedin from "../common/img/Linkedin.svg"

import style from "../common/styles/main.module.css";

const LogIn = () => {

    const auth = useContext(AuthContext)

    const { request } = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        emailErr: "",
        passwordErr: "",
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            if (data.message === "User was not found!") {
                setErrors(errors => ({ ...errors, emailErr: "User was not found!" }))
            }
            if (data.message === "Not valid password!") {
                setErrors(errors => ({ ...errors, passwordErr: "Not valid password!" }))
            }
            if (data.errors[0].msg === "Not correct email") {
                setErrors(errors => ({ ...errors, emailErr: "Not correct email" }))
            }
        } catch (e) { }
    }

    return (
        <div className={style.wrapper}>
            <NavReg />
            <div className={style.container}>
                <div className={style.form}>
                    <p className={style.title}>To continue, log in</p>
                    <div className={style.social_networks}>
                        <ul>
                            <li><img src={facebook} alt="facebook" /></li>
                            <li><img src={linkedin} alt="linkedin" /></li>
                        </ul>
                    </div>
                    <div className={style.margin_input_wrapper}>
                        <input
                            placeholder="E-mail"
                            type="text"
                            name="email"
                            onChange={changeHandler}
                            className={errors.emailErr ? `${style.errorInput}` : `${style.defaulInput}`}
                        />
                        {errors.emailErr ? <p className={style.errorText}>{errors.emailErr}</p> : ""}
                    </div>
                    <div className={style.margin_input_wrapper}>
                        <input placeholder="Password"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            className={errors.passwordErr ? `${style.errorInput}` : `${style.defaulInput}`}
                        />
                        {errors.passwordErr ? <p className={style.errorText}>{errors.passwordErr}</p> : ""}
                    </div>
                    <button className={style.reg} onClick={loginHandler}>Log in</button>
                </div>
            </div>
            <div >
                <div className={style.container}>
                    <div className={style.theme}>
                        <img src={dark} alt="dark" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;