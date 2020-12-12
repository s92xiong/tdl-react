const eventHandlers = (categories, setCategories, setCategorySelected, inputFieldCategory, setInputFieldCategory, currentCategory, setCurrentCategory) => {
  
  const addNewCategory = (e) => {
    e.preventDefault(); 
    
    // Prevent user from submitting empty strings
    if (inputFieldCategory.length < 1) return;

    // Prevent duplicate categories
    const checkDuplicates = categories.filter(category => inputFieldCategory === category.name);
    if (checkDuplicates.length > 0) return;
    
    setCategories({ type: "add-category", payload: { name: inputFieldCategory } });
    setCurrentCategory(inputFieldCategory);
    setInputFieldCategory("");
    setCategorySelected(true);
  };

  const changeCategory = (e) => {
    setCategorySelected(true);
    setCurrentCategory(e.target.getAttribute("name"));
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
    setCategories({
      type: "delete-category",
      payload: {
        id: categoryID
      } 
    });

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

  return {
    addNewCategory,
    changeCategory,
    deleteCategory,
  };
};

export default eventHandlers;