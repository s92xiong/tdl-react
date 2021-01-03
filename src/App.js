import React, { useState, useEffect } from 'react';
import './App.css';
import eventHandlers from './components/logic/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';
import getCategories from './components/logic/getCategories';
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from './firebase';


function App() {

  const [user] = useAuthState(auth);
  
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [categorySelected, setCategorySelected] = useState(false);

  const [taskInput, setTaskInput] = useState("");

  // Get access to methods from eventHandlers.js via destructuring
  const { 
    addNewCategory, changeCategory, deleteCategory, 
    addTask, handleTaskInput, completeTask, deleteTask, clearCompleted,
  } = eventHandlers(
    categories, setCategories, categoryInput, setCategoryInput, setCategorySelected,
    taskInput, setTaskInput,
  );

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  useEffect(() => {
    getCategories(setCategories);
  }, []);
  
  return (
    <div className="App">
      <Header />
      {
        (!user) ?
        <div className="container-sign-in">
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        :
        <div className="container">
          <Sidebar 
            handleSubmit={addNewCategory} 
            setCategoryInput={setCategoryInput}
            categoryInput={categoryInput}
            array={categories}
            changeCategory={changeCategory}
          />
          <Content
            // Content Header
            categories={categories}
            categorySelected={categorySelected}
            handleDeleteCategory={deleteCategory}

            // Task Content
            submitTask={addTask}
            taskInputState={taskInput}
            handleTaskInput={handleTaskInput}
            completeTask={completeTask}
            deleteTask={deleteTask}
            clearCompleted={clearCompleted}
          />
        </div>
      }
    </div>
  );
}

export default App;