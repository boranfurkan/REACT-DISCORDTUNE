import styles from "./SuggestionShow.module.css"
import useListsContext from '../../hooks/use-lists-context';
import { toast } from 'react-toastify';

function SuggestionShow({ suggestion, list }) {
    const { addSong } = useListsContext()
    const handleAddClick = () => {
        addSong(list.name, suggestion)
        toast.success(`Successfully Added To List 🎧`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <div onClick={handleAddClick}>
            <div className={styles.SuggestionShow}>
                <img src={suggestion.snippet.thumbnails.default.url} alt="song album cover"></img>
                <h5>{suggestion.snippet.title.slice(0, 55)}</h5>
                <p>{suggestion.snippet.channelTitle}</p>
            </div>
        </div>
    )
}

export default SuggestionShow;