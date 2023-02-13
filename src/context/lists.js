import { createContext, useState, useCallback } from "react";
import axios from "axios";


const ListsContext = createContext();

function Provider({ children }) {
    const [lists, setLists] = useState([])

    const fetchLists = useCallback(async () => {
        const response = await axios.get('https://discord-tune.herokuapp.com/api/v1/lists');
        setLists(response.data.lists);
    }, []);

    const createList = async (listName, creatorName, chosenCover) => {
        const response = await axios.post('https://discord-tune.herokuapp.com/api/v1/lists', {
            name: listName, createdBy: creatorName, songs: [], albumCover: chosenCover
        });

        setLists([...lists, response.data.list])
    }

    const deleteListByName = async (name) => {
        const response = await axios.delete('https://discord-tune.herokuapp.com/api/v1/lists/?listname=' + name);

        setLists([...lists, response.data.list])

        const updatedLists = lists.filter((list) => {
            return list.name !== name;
        });

        setLists(updatedLists);
    };

    const addSong = async (listname, suggestion) => {
        const response = await axios.post('https://discord-tune.herokuapp.com/api/v1/lists/songs?listname=' + listname,
            { name: suggestion.snippet.title, singer: suggestion.snippet.channelTitle, url: suggestion.id.videoId, albumCover: suggestion.snippet.thumbnails.default.url });
        const updatedLists = lists.filter((list) => {
            return list.name !== listname;
        });

        setLists([...updatedLists, response.data.list])
    };

    const deleteSong = async (listname, songId) => {

        const response = await axios.delete('https://discord-tune.herokuapp.com/api/v1/lists/songs?listname=' + listname + '&songId=' + songId)

        const updatedLists = lists.filter((list) => {
            return list.name !== listname;
        });

        setLists([...updatedLists, response.data.list])
    };

    const addSpotifyList = async (listname, songArray) => {
        const data = { items: songArray }
        const response = await axios.put('https://discord-tune.herokuapp.com/api/v1/lists/songs?listname=' + listname, data);
        const updatedLists = lists.filter((list) => {
            return list.name !== listname;
        });
        setLists([...updatedLists, response.data.list])
    };

    const valueToShare = {
        lists: lists,
        deleteListByName: deleteListByName,
        createList: createList,
        fetchLists: fetchLists,
        addSong: addSong,
        deleteSong: deleteSong,
        addSpotifyList: addSpotifyList,
    };

    return (
        <ListsContext.Provider value={valueToShare}>
            {children}
        </ListsContext.Provider>
    );
}

export { Provider };
export default ListsContext;
