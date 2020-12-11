const eventHandlers = (listCategory, setListCategory, setListSelected, inputListRef, currentList, setCurrentList) => {
  const addNewList = (e) => {
    e.preventDefault(); 
    setListCategory([...listCategory, inputListRef.current.value]);
    setListSelected(true);
    const newObj = {...currentList};
    newObj.name = inputListRef.current.value;
    newObj.index = listCategory.length;
    console.log(newObj.index, newObj.name);
    setCurrentList(newObj);
    inputListRef.current.value = "";
  };

  const changeList = (e) => {
    setListSelected(true);
    const newObj = {...currentList};
    newObj.name = e.target.textContent;
    newObj.index = Number(e.target.getAttribute('data-index'));
    setCurrentList(newObj);
  };

  const deleteList = () => {
    const newArray = [...listCategory];
    newArray.splice(currentList.index, 1);
    setListCategory(newArray);
    setCurrentList({});
    setListSelected(false);
  };

  return {
    addNewList,
    changeList,
    deleteList,
  };
};

export default eventHandlers;