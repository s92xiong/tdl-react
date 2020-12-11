const eventHandlers = (categories, setCategories, setListSelected, inputListRef, currentList, setCurrentList) => {
  const addNewList = (e) => {
    e.preventDefault(); 
    
    // Add new object to the list
    setCategories([...categories, inputListRef.current.value]);
    setListSelected(true);
    
    // Open the list the user currently just added
    const newObj = {...currentList};
    newObj.name = inputListRef.current.value;
    newObj.index = categories.length;
    setCurrentList(newObj);

    // Clear input field
    inputListRef.current.value = "";
  };

  const changeList = (e) => {
    setListSelected(true);
    const newObj = {...currentList};
    newObj.name = e.target.textContent;
    // Having an index property helps to easily locate an element to delete it later on
    newObj.index = Number(e.target.getAttribute('data-index'));
    setCurrentList(newObj);
  };

  const deleteList = () => {
    // Remove the category from the array
    const newCategories = [...categories];
    newCategories.splice(currentList.index, 1);
    setCategories(newCategories);

    // If you delete a category and there is at least 1 category remaining, render the first category in the list
    if (newCategories.length > 0) {
      const newObj = {...currentList};
      newObj.name = newCategories[0];
      newObj.index = 0;
      setCurrentList(newObj);
    } else {
      // If all categories are deleted (or non-existent) then don't render anything in the content header
      setCurrentList({});
      setListSelected(false);
    }
  };

  return {
    addNewList,
    changeList,
    deleteList,
  };
};

export default eventHandlers;