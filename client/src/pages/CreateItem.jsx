import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useHistory, Link } from "react-router-dom";

import drag_and_drop from "../common/img/drag_and_drop.png"

import style from "../common/styles/creating.module.css";
import MyItems from "./MyItems";

const CreateItem = () => {

    const { request } = useHttp()
    const history = useHistory()
    const collectionId = history.location.pathname.slice(13, 37)

    const [drag, setDrag] = useState(false)
    const [error, setError] = useState("")
    const [fileName, setfileName] = useState(false)
    const [selectedFile, setSelectedFile] = useState()

    const [itemName, setItemName] = useState()
    const [nameError, setNameError] = useState()
    const [tegs, setTegs] = useState()


    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false)
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        if (checkingDropError(files)) {
            setfileName(files[0].name)
            setSelectedFile(files[0])
        }
    }

    const checkingDropError = (files) => {

        if (files.length > 1) {
            setError("Error: please drop one image!")
        }

        switch (files[0].type) {
            case "image/jpeg":
                return true
            case "image/svg":
                return true
            case "image/svg+xml":
                return true
            case "image/png":
                return true
            default:
                setError("Error: please drop img in the format jpg, png or svg!")
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
    }


    const uploadImage = async (base64EncodedImage) => {
        try {
            await request('/api/add_item_to_cloudinary', 'POST',
                {
                    img: base64EncodedImage,
                    id: collectionId,
                    name: itemName, tegs
                },
            ).then((res) => {
                console.log(res)
                if (res.msg === "Successfully adding!") {
                    console.log("Попал")
                    history.push(`/my_items/${collectionId}`)
                }
                if (res.errors[0].msg === "Name is required!") {
                    setNameError("Name is required")
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.blur_background}>
                <MyItems />
            </div>
            <div className={style.background_for_alerts}></div>
            <div className={style.window}>
                <p>New item</p>
                <input placeholder="The name of the new item" onChange={(e) => setItemName(e.target.value)} />
                {nameError ? <p className={`${style.window_error} ${style.left}`}>{nameError}</p> : <></>}
                <input placeholder="Tegs" onChange={(e) => setTegs(e.target.value)} />
                {drag ?
                    <div className={style.drag_drop_field}
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                        onDrop={(e) => onDropHandler(e)}
                    >
                        <img src={drag_and_drop} alt="drag_and_drop" />
                        <p>Drop the image</p>
                    </div>
                    :
                    <div className={style.drag_drop_field}
                        onDragStart={(e) => dragStartHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragStartHandler(e)}
                    >
                        <img src={drag_and_drop} alt="drag_and_drop" />
                        <p>Carry the image</p>
                    </div>
                }
                {error ? <p className={style.window_error}>{error}</p> : <></>}
                {fileName ?
                    <div className={style.uploaded_files}>
                        <p>Uploaded files</p>
                        <div className={style.uploaded_file_wrapper}>
                            <div className={style.uploaded_file}></div>
                            <p>{fileName}</p>
                        </div>
                    </div>
                    :
                    <></>
                }
                <div className={style.button_wrapper}>
                    <Link to={`/my_items/${collectionId}`}><button className={style.cancel_button}>Cancel</button></Link>
                    <button className={style.create_button} onClick={(e) => handleSubmitFile(e)}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateItem;