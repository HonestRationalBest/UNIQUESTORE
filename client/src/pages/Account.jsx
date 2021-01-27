import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setMyData } from "../redux/actions/setMyData";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";

import NavAcc from "../components/NavBars/Navacc";
import NavPanel from "../components/NavBars/NavigationPanel";
import Footer from "../components/Footer";

import dark from "../common/img/dark.svg"
import plus from "../common/img/plus.svg"
import ava from "../common/img/ava.svg"

import style from "../common/styles/account.module.css";
import { setAvatar } from "../redux/actions/setAvatar";

const Account = ({ userId }) => {

    const [error, setError] = useState("")
    const [profileImg, setProfileImg] = useState(ava)
    const { request } = useHttp()
    const dispatch = useDispatch()
    const myData = useSelector(state => state.mainPage.myData)

    useEffect(() => {
        request(`/api/my_data/${userId}`, 'GET',).then((res) => {
            dispatch(setMyData(res))
        })
    }, [])



    const imageHandler = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.onload = () => {
            checkingDropError(reader.result)
            setProfileImg(reader.result)
            dispatch(setAvatar(reader.result))
        }
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const checkingDropError = (files) => {
        if (files.length > 1) {
            setError("Error: please drop one image!")
        }
        switch (files[0].type) {
            case "image/jpeg":
                return true
            case "image/png":
                return true
            default:
                setError("Error: please drop img in the format jpg or png!")
        }
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            await request('api/add_avatar_to_cloudinary', 'POST',
                { img: base64EncodedImage, id: userId, },
            ).then((res) => {
                console.log(res)
            })
        } catch (err) {
            console.log(err)
        }
    }

    console.log(myData)

    return (
        <div className={style.wrapper}>
            <NavAcc />
            <NavPanel />
            <div className={style.container}>
                <div className={style.content_wrapper}>
                    <div className={style.profile}>
                        <div className={style.avatar}>
                            <img className={style.ava} src={myData.img || profileImg} alt="ava" />
                            <input id="avatar" type="file" onChange={(e) => imageHandler(e)} />
                            <label htmlFor="avatar" className={style.avatar_label}><img src={plus} alt="plus" /></label>
                        </div>
                        <div className={style.user_data}>
                            <p>{myData.name}</p>
                            <div className={style.fields_wrapper}>
                                <p>{myData.email}</p>
                            </div>
                            <div className={style.deleteAcc}><Link to="/" >Delete account</Link></div>
                        </div>
                    </div>
                    <img src={dark} alt="dark" className={style.dark} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Account;