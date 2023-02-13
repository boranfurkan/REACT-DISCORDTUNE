import styles from "./CreateList.module.css"
import one from "../../assets/images/1.jpg"
import two from "../../assets/images/2.jpg"
import three from "../../assets/images/3.jpg"
import four from "../../assets/images/4.jpg"
import five from "../../assets/images/5.jpg"
import six from "../../assets/images/6.jpg"
import seven from "../../assets/images/7.jpg"
import eigth from "../../assets/images/8.jpg"
import nine from "../../assets/images/9.jpg"
import ten from "../../assets/images/10.jpg"
import eleven from "../../assets/images/11.jpg"
import twelwe from "../../assets/images/12.jpg"
import { useState } from "react"
import useListsContext from '../../hooks/use-lists-context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateList() {
    const { createList } = useListsContext()
    const [inputName, setInputName] = useState("")
    const [inputPlaylist, setInputPlatlist] = useState("")
    const [chosenCover, setChosenCover] = useState(one)

    function handleClick(event) {
        setChosenCover(event.target.value)
    }

    function handleNameChange(event) {
        setInputName(event.target.value)
    }

    function handlePlaylistChange(event) {
        setInputPlatlist(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        createList(inputPlaylist, inputName, chosenCover)
        toast.success('Successfully created 🎧', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setInputName("")
        setInputPlatlist("")
    }

    return (
        <div className={styles.Main}>
            <h2>CREATE YOUR PLAYLIST</h2>
            <div className={styles.Playlist}>
                <div className={styles.CoverShow}>
                    <input value={one} onClick={handleClick} type="image" src={one} alt="Album Cover" autoFocus />
                    <input value={two} onClick={handleClick} type="image" src={two} alt="Album Cover" />
                    <input value={three} onClick={handleClick} type="image" src={three} alt="Album Cover" />
                    <input value={four} onClick={handleClick} type="image" src={four} alt="Album Cover" />
                    <input value={five} onClick={handleClick} type="image" src={five} alt="Album Cover" />
                    <input value={six} onClick={handleClick} type="image" src={six} alt="Album Cover" />
                    <input value={seven} onClick={handleClick} type="image" src={seven} alt="Album Cover" />
                    <input value={eigth} onClick={handleClick} type="image" src={eigth} alt="Album Cover" />
                    <input value={nine} onClick={handleClick} type="image" src={nine} alt="Album Cover" />
                    <input value={ten} onClick={handleClick} type="image" src={ten} alt="Album Cover" />
                    <input value={eleven} onClick={handleClick} type="image" src={eleven} alt="Album Cover" />
                    <input value={twelwe} onClick={handleClick} type="image" src={twelwe} alt="Album Cover" />
                </div>
                <div className={styles.Chosen}>
                    <label>ALBUM COVER</label>
                    <img src={chosenCover} alt="Album Cover"></img>
                </div>
                <form onSubmit={handleSubmit} className={styles.Form}>
                    <label>YOUR NAME</label>
                    <input onChange={handleNameChange} value={inputName} type="text" maxLength={15} minLength={3} required></input>
                    <label>PLAYLIST NAME</label>
                    <input onChange={handlePlaylistChange} value={inputPlaylist} type="text" maxLength={15} minLength={3} required></input>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateList