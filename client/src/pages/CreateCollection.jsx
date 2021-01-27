import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useHistory, Link } from "react-router-dom";

import MyCollections from "./MyCollections";

import drag_and_drop from "../common/img/drag_and_drop.png"

import style from "../common/styles/creating.module.css";

const CreateCollection = ({ userId }) => {

    const { request } = useHttp()
    const history = useHistory();

    const [drag, setDrag] = useState(false)
    const [error, setError] = useState("")
    const [fileName, setfileName] = useState(false)
    const [selectedFile, setSelectedFile] = useState();

    const [collectionName, setCollectionName] = useState();
    const [nameError, setNameError] = useState()


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
            let date = new Date()
            await request('api/add_collection_to_cloudinary', 'POST',
                { img: base64EncodedImage, id: userId, name: collectionName, date: date },
            ).then((res) => {
                console.log(res)
                if (res.msg === "Successfully adding!") {
                    console.log("Попал")
                    history.push("/my_collections")
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
            {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
            <div className={style.blur_background}>
                <MyCollections />
            </div>
            <div className={style.window}>
                <p>New collection</p>
                <input placeholder="The name of the new colleciton" onChange={(e) => setCollectionName(e.target.value)} />
                {nameError ? <p className={`${style.window_error} ${style.left}`}>{nameError}</p> : <></>}
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
                    <Link to="/my_collections"><button className={style.cancel_button}>Cancel</button></Link>
                    <button className={style.create_button} onClick={(e) => handleSubmitFile(e)}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCollection;