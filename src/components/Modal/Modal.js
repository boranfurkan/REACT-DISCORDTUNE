import React, { useState, useCallback, useEffect } from "react";
import { BsFillPatchPlusFill, BsPencilSquare, BsArrowLeft, BsSpotify } from "react-icons/bs";
import styles from "./Modal.module.css";
import axios from "axios";
import Suggestions from "../Suggestions/Suggestions";
import Songs from "../Songs/Songs";
import Spotify from "../Spotify/Spotify";

function Modal({ list, onClose }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [spotify, setSpotify] = useState(false)
    const [results, setResults] = useState([])

    const fetchTrends = useCallback(async () => {
        const response = await axios.get('https://discord-tune.herokuapp.com/api/v1/youtube?q=uzi');
        console.log(response)
        setResults(response.data.items)
    }, []);

    useEffect(() => {
        fetchTrends();
    }, [fetchTrends]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleEditClik = () => {
        setEditMode(true)
    }

    const handleAddClick = () => {
        setAddMode(true)
    }
    const handleSpotifylick = () => {
        setSpotify(true)
    }

    const handleBackClick = () => {
        setEditMode(false)
        setAddMode(false)
        setSpotify(false)
    }

    const fetchSearchSuggestions = async (event) => {
        event.preventDefault()
        const response = await axios.get(`https://discord-tune.herokuapp.com/api/v1/youtube?q=${searchTerm}`);
        setResults(response.data.items)
        setSearchTerm("")
    }

    const baseContent = (
        <div className={styles.Wraper}>
            <div className={styles.Creator}>
                <h3>{list.name.toUpperCase()}</h3>
                <p>{list.createdBy}</p>
            </div>
            <div className={styles.Buttons}>
                <button onClick={handleEditClik}><BsPencilSquare />Edit Songs</button>
                <button onClick={handleAddClick}><BsFillPatchPlusFill />Add Songs</button>
                <button onClick={handleSpotifylick}><BsSpotify />Link Spotify List</button>
            </div>
        </div>
    )

    const editSongsContent = (
        <div className={styles.Songs}>
            <div className={styles.Info}>
                <h4>LIST SONGS</h4>
                <button onClick={handleBackClick}><BsArrowLeft /></button>
            </div>
            <Songs list={list} />
        </div>
    )

    const addSongsContent = (
        <div className={styles.Suggestions}>
            <form onSubmit={fetchSearchSuggestions} className={styles.Term}>
                <div className={styles.Info}>
                    <label>SEARCH SONG</label>
                    <button type="button" onClick={handleBackClick}><BsArrowLeft /></button>
                </div>
                <div className={styles.Input}>
                    <input onChange={handleChange} value={searchTerm} type="text" maxLength={20} minLength={1} required autoFocus></input>
                    <button type="submit">SEARCH</button>
                </div>
            </form>
            {results && <Suggestions suggestions={results} list={list} />}
        </div>
    )

    const spotifyContent = (
        <div className={styles.Songs}>
            <div className={styles.Info}>
                <h4>LIST SONGS</h4>
                <button type="button" onClick={handleBackClick}><BsArrowLeft /></button>
            </div>
            <Spotify list={list} />
        </div>
    )

    let content

    if (editMode || addMode || spotify) {
        if (editMode) {
            content = editSongsContent
        }
        else if (spotify) {
            content = spotifyContent
        } else {
            content = addSongsContent
        }
    } else {
        content = baseContent
    }

    return (
        <React.Fragment>
            <div>
                <div className={styles.Backdrop} onClick={onClose} />
                <div className={styles.ModalBackground}>
                    {content}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal;

