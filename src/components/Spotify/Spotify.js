import styles from "./Spotify.module.css"
import { useState } from "react";
import axios from "axios";
import useListsContext from '../../hooks/use-lists-context';
import { toast } from 'react-toastify';

function Spotify({ list }) {
    const { addSpotifyList } = useListsContext()
    const [listLink, setListLink] = useState("")

    const handleChange = (event) => {
        setListLink(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const listId = listLink.split("?")[0].split("/")[4]
        const response = await axios.get(`https://discord-tune.herokuapp.com/api/v1/spotify?listId=${listId}`)
        if (response.status === 200) {
            const songArray = []
            response.data.items.map((song) => {
                const template = {
                    name: song.track.name,
                    singer: song.track.artists[0].name,
                    url: song.track.external_urls.spotify,
                    albumCover: song.track.album.images[1].url
                };
                songArray.push(template);
                return songArray
            })
            addSpotifyList(list.name, songArray);
            setListLink("")
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
        } else {
            toast.error('An Error Occurred!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            throw Error(response.statusText);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.Form}>
            <label>SPOTIFY PLAYLIST LINK</label>
            <input onChange={handleChange} value={listLink} type="text" minLength={3} required></input>
            <button type="submit">ADD ALL</button>
        </form>
    )
}

export default Spotify;