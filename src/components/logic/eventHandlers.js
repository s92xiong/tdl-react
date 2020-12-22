const eventHandlers = (
    categories, dispatch, 
    categoryValue, setCategoryValue, 
    setCategorySelected, 
    currentCategory, setCurrentCategory,
    taskValue, setTaskValue,
  ) => {
  
  const addCategory = (e) => {
    e.preventDefault(); 
    
    // Prevent user from submitting empty strings
    if (categoryValue.length < 1) return;

    // Prevent duplicate categories
    const checkDuplicates = categories.filter(category => categoryValue === category.name);
    if (checkDuplicates.length > 0) return;
    
    dispatch({ type: "add-category", payload: { name: categoryValue } });

    setCurrentCategory(categoryValue);
    setCategoryValue("");
    setCategorySelected(true);
  };

  const changeCategory = (e) => {
    let categoryID;
    categories.forEach(category => {
      if (category.name === currentCategory) categoryID = category.id;
    });

    setCategorySelected(true);
    setCurrentCategory(e.target.getAttribute("name"));
    dispatch({ type: "change-category", payload: { id: categoryID } });
  };

  const deleteCategory = (e) => {
    // Get ID and index for the current category
    let categoryID, categoryIndex;
    categories.forEach((category, index) => {
      if (category.name === currentCategory) {
        categoryID = category.id;
        categoryIndex = index;
      }
    });

    // Update state for categories
    dispatch({ type: "delete-category", payload: { id: categoryID } });

    // If you delete a category, set the current category to the next category after it (index 1)
    if (categories.length > 1 && categoryIndex === 0) {
      setCurrentCategory(categories[1].name);
      // If you delete any category that isn't the first one, set the current category to 1st (index 0) in the list
    } else if (categories.length > 1) {
      setCurrentCategory(categories[0].name);
    } else {
      // If all categories are deleted (or non-existent), don't render any categories in the content header
      setCurrentCategory("");
      setCategorySelected(false);
    }
  };

  const submitTask = (e) => {
    e.preventDefault();
    dispatch({ type: "add-task", payload: { task: taskValue } });
    setTaskValue("");
  };

  return {
    addCategory,
    changeCategory,
    deleteCategory,
    submitTask,
  };
};

export default eventHandlers;