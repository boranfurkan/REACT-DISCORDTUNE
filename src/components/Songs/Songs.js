import SongShow from "../SongShow/SongShow";
import styles from "./Songs.module.css"

function Songs({ list }) {
    const allSongs = list.songs.map((song) => <SongShow key={song.url} song={song} list={list} />)
    return (
        <div className={styles.Panel}>
            {allSongs}
        </div>
    )
}

export default Songs;