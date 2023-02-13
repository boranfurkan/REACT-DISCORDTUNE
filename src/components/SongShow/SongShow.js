import { useState } from "react";
import styles from "./SongShow.module.css"
import useListsContext from '../../hooks/use-lists-context';
import { BsTrashFill } from "react-icons/bs";
import InfoModal from "../InfoModal/InfoModal";

function SongShow({ song, list }) {
    const [showInfo, setShowInfo] = useState(false)

    const { deleteSong } = useListsContext()

    const handleDeleteClick = () => {
        setShowInfo(true)
    }

    const handleConfirmClick = () => {
        deleteSong(list.name, song._id)
    }

    const handleCancelClick = () => {
        setShowInfo(false)
    }

    return (
        <div>
            <div className={styles.SongShow}>
                <img src={song.albumCover} alt="song album cover"></img>
                <h5>{song.name.slice(0, 55)}</h5>
                <div>
                    <div className={styles.Buttons}>
                        <button onClick={handleDeleteClick}><BsTrashFill /></button>
                    </div>
                    <p>{song.singer}</p>
                </div>
            </div>
            {showInfo && <InfoModal title={"delete"} message={"Do you really want to delete selected item?"} onConfirm={handleConfirmClick} onCancel={handleCancelClick} />}
        </div>
    )
}

export default SongShow;