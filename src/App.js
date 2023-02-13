import './App.css';
import { useContext, useEffect } from "react";
import Navbar from './components/Navbar/Navbar';
import CreateList from './components/CreateList/CreateList';
import List from './components/List/List';
import ListsContext from './context/lists';
import { ToastContainer } from 'react-toastify';

function App() {
  const { fetchLists } = useContext(ListsContext)

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <div className="App">
      <Navbar />
      <CreateList />
      <List />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
