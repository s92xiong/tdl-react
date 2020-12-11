import React, { useRef, useState } from 'react';
import './App.css';
import Content from './components/content/Content';
import eventHandlers from './components/handlers/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [isListSelected, setListSelected] = useState(false);
  const [currentList, setCurrentList] = useState({});
  const [listCategory, setListCategory] = useState([]);
  const inputListRef = useRef();

  const { 
    addNewList,
    changeList, 
    deleteList 
  } = eventHandlers(listCategory, setListCategory, setListSelected, inputListRef, currentList, setCurrentList);
  
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar 
          handleSubmit={addNewList} 
          handleRef={inputListRef}
          setListCategory={setListCategory}
          array={listCategory}
          changeList={changeList}
        />
        <Content
          currentList={currentList.name}
          listCategory={listCategory}
          isListSelected={isListSelected}
          handleDeleteList={deleteList}
        />
      </div>
    </div>
  );
}

export default App;