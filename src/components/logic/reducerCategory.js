function reducerCategory(categories, action) {
  switch (action.type) {

    case "add-category":
      return [...categories, newCategory(action.payload.name)];

    case "delete-category":
      return categories.filter(category => category.id !== action.payload.id);
    
    default:
      return categories;
  }
}

function newCategory(name) {
  return {
    name: name,
    taskList: {},
    id: Date.now(),
  };
}

export default reducerCategory;