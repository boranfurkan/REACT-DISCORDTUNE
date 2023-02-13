import SuggestionShow from "../SuggestionShow/SuggestionShow"
import styles from "./Suggestions.module.css"

function Suggestions({ suggestions, list }) {
    const songIdArray = []
    list.songs.map((song) => songIdArray.push(song.url))

    let allSuggestions = suggestions.filter((suggestion) => { return !songIdArray.includes(suggestion.id.videoId) })

    const finalSuggestions = allSuggestions.map((suggestion) => <SuggestionShow key={suggestion.etag} suggestion={suggestion} list={list} />)
    return (
        <div className={styles.Panel}>
            {finalSuggestions}
        </div>
    )
}

export default Suggestions;