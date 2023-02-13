import React, { useState } from "react";
import styles from "./ListShow.module.css"
import useListsContext from '../../hooks/use-lists-context';
import Modal from "../Modal/Modal";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import InfoModal from "../InfoModal/InfoModal";

function ListShow({ list }) {
    const { deleteListByName } = useListsContext()
    const [showModal, setShowModal] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    const handleEditClick = () => {
        setShowModal(true)
    }

    const handleDeleteClick = () => {
        setShowInfo(true)
    };

    const handleConfirmClick = () => {
        deleteListByName(list.name);
    }

    const handleCancelClick = () => {
        setShowInfo(false)
    }

    const handleCloseClick = () => {
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <div className={styles.Main}>
                <div className={styles.Click} onClick={handleEditClick}>
                    <img src={list.albumCover} alt="Album Cover"></img>
                    <div>
                        <h4>{list.name}</h4>
                        <p>Created by {list.createdBy}</p>
                    </div>
                </div>
                <div className={styles.Buttons}>
                    <button onClick={handleEditClick}><BsPencilSquare /></button>
                    <button onClick={handleDeleteClick}><BsTrashFill /></button>
                </div>
                {showModal && <Modal list={list} onClose={handleCloseClick} />}
                {showInfo && <InfoModal title={"delete"} message={"Do you really want to delete selected item?"} onConfirm={handleConfirmClick} onCancel={handleCancelClick} />}
            </div>
        </React.Fragment>
    )
}

export default ListShow;