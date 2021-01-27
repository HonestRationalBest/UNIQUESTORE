import React, { useState, useEffect } from 'react';
import style from "../common/styles/common_el.module.css"

export default function Alert({ msg, type }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (msg) {
            setShow(true);
            setInterval(() => {
                setShow(false);
            }, 2000);
        }
    }, [msg]);
    return <>{show && <div className={`${style.alert}${style.alert} + ${type}`}>{msg}</div>}</>;
}
