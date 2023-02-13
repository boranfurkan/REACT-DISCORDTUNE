import ListShow from "../ListShow/ListShow"
import styles from "./List.module.css"
import useListsContext from '../../hooks/use-lists-context';

function List() {
    const { lists } = useListsContext()
    const allLists = lists.map((list) => <ListShow key={list._id} list={list} />)

    return <div className={styles.Main}>
        <h2>SEARCH FOR PLAYLISTS</h2>
        <div className={styles.Panel}>
            {allLists}
        </div>
    </div>
}

export default List;