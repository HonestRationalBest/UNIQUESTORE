import React from "react";
import { Link } from "react-router-dom";

import Comment from "../components/Comment"

import like from "../common/img/Like.svg"
import send from "../common/img/send.svg"
import coin from "../common/img/coin.png"

import style from "../common/styles/items.module.css";


const Item = ({ isAuth, currentSlide, itemData }) => {

    return (
        <>
            {currentSlide &&
                <div className={style.contant}>
                    <div className={style.link_wrapper}>
                        <Link to="/home">Back</Link>
                    </div>
                    <div className={style.contant_wrapper}>
                        <div className={style.item_img}>
                            <img src={itemData.img} alt="coin" />
                            <div className={style.item_name}><p>{itemData.name}</p></div>
                        </div>
                        {isAuth ? <div className={style.text_wrapper}>
                            <div className={style.likes_wrapper}>
                                <img src={like} alt="like" />
                                <p>{itemData.likesCount}</p>
                            </div>
                            <div className={style.tegs}>
                                <p>{itemData.tegs}</p>
                            </div>
                            <div className={style.comment_count}>
                                <p>Сomments (10)</p>
                            </div>
                            <div className={style.comment_wrapper}>
                                <Comment />
                                <Comment />
                            </div>
                            <div className={style.comment_input_wrappper}>
                                <input placeholder="leave a comment" className={style.comment_input} />
                                <img alt="send" src={send} className={style.send} />
                            </div>
                        </div>
                            :
                            <div className={style.text_wrapper}>
                                <div className={style.tegs}>
                                    <p>jjjjjjjjjjjjjdflisvnadfiva;nddflix</p>
                                </div>
                                <p className={style.login_and_signin}>To see comments and likes,
                                <span><Link to="/login"> log in</Link></span> to your account or
                                <span><Link to="/signin"> register</Link></span></p>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )

}

export default Item;