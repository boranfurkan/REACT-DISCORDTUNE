import { useContext } from 'react';
import ListsContext from '../context/lists';

function useListsContext() {
  return useContext(ListsContext);
}

export default useListsContext;
