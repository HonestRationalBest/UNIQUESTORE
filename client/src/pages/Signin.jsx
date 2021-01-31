import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

import Navlog from "../components/NavBars/Navlog";

import dark from "../common/img/dark.svg"
import facebook from "../common/img/facebook.svg"
import linkedin from "../common/img/Linkedin.svg"

import style from "../common/styles/main.module.css";


const SignIn = () => {

    const { loading, error, request } = useHttp();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "",
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {

        try {
            const data = await request('api/auth/register', 'POST', { ...form })

            if (data.message === "This user already exist!") {
                setErrors(errors => ({ ...errors, emailErr: "This user already exist!" }))
            }
            for (let i = 0; i < data.errors.length; i++) {
                if (data.errors[i].msg === "Name is required!") {
                    setErrors(errors => ({ ...errors, nameErr: "Name is required!" }))
                }
                if (data.errors[i].msg === "Password too small, min lenght 6") {
                    setErrors(errors => ({ ...errors, passwordErr: "Password too small, min lenght 6" }))
                }
                if (data.errors[i].msg === "Not correct email") {
                    setErrors(errors => ({ ...errors, emailErr: "Not correct email" }))
                }
            }
        } catch (e) { }
    }

    return (
        <div className={style.wrapper}>
            <Navlog />
            {/* <div className={style.gray}>
            </div> */}
            <div className={style.container}>
                <div className={style.form}>
                    <p className={style.title}>To continue, sign in</p>
                    {/* <div className={style.social_networks}>
                        <ul>
                            <li><img src={facebook} alt="facebook" /></li>
                            <li><img src={linkedin} alt="linkedin" /></li>
                        </ul>
                    </div> */}
                    <div className={style.margin_input_wrapper}>
                        <input
                            placeholder="Username"
                            type="text"
                            name="name"
                            onChange={changeHandler}
                            className={errors.nameErr ? `${style.errorInput}` : `${style.defaulInput}`}
                        />
                        {errors.nameErr ? <p className={style.errorText}>{errors.nameErr}</p> : ""}
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
                    <button className={style.reg} onClick={registerHandler} disabled={loading}>Sign in</button>
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

export default SignIn;