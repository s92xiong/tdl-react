const eventHandlers = (categories, setCategories, setCategorySelected, inputFieldRef, currentCategory, setCurrentCategory) => {
  
  const addNewCategory = (e) => {
    // Prevent page refresh upon submit
    e.preventDefault(); 

    // Prevent user from submitting empty strings
    if (inputFieldRef.current.value.length < 1) return;
    
    // Add new object to the category list
    setCategories([...categories, inputFieldRef.current.value]);
    setCategorySelected(true);
    
    // Activate/render the category the user currently just added
    const newObj = {...currentCategory};
    newObj.name = inputFieldRef.current.value;
    newObj.index = categories.length;
    setCurrentCategory(newObj);

    // Clear input field
    inputFieldRef.current.value = "";
  };

  const changeCategory = (e) => {
    setCategorySelected(true);
    const newObj = {...currentCategory};
    newObj.name = e.target.textContent;
    // Having an index property helps to easily locate an element to delete it later on
    newObj.index = Number(e.target.getAttribute('data-index'));
    setCurrentCategory(newObj);
  };

  const deleteCategory = () => {
    // Remove the category from the array
    const newCategories = [...categories];
    newCategories.splice(currentCategory.index, 1);
    setCategories(newCategories);

    // If you delete a category and there is at least 1 category remaining, render the first category in the list
    if (newCategories.length > 0) {
      const newObj = {...currentCategory};
      newObj.name = newCategories[0];
      newObj.index = 0;
      setCurrentCategory(newObj);
    } else {
      // If all categories are deleted (or non-existent) then don't render anything in the content header
      setCurrentCategory({});
      setCategorySelected(false);
    }
  };

  return {
    addNewCategory,
    changeCategory,
    deleteCategory,
  };
};

export default eventHandlers;