function reducer(categories, action) {
  switch (action.type) {

    case "add-category": {
      const newCategories = [...categories];

      for (const obj in newCategories) {
        newCategories[obj].active = false;
      }

      newCategories.push(newCategory(action.payload.name));
      return newCategories;
    }

    case "change-category": {
      const newCategories = [...categories];

      // Get desired index
      let index;
      newCategories.forEach((category, i) => {
        if (category.id === action.payload.id) index = i;
        category.active = false;
      });
      console.log(index);

      newCategories[index].active = true;
      
      return newCategories;
    }

    case "delete-category": {
      const newCategories = categories.filter(category => category.id !== action.payload.id);

      for (const obj in newCategories) {
        newCategories[obj].active = false;
      }

      // Set first category to be active after deleting a category
      if (newCategories.length > 0) newCategories[0].active = true;
      return newCategories;
    }

    case "add-task": {
      const newCategories = [...categories];
      
      // Get active list, add tasks that active list
      let activeIndex;
      for (const obj in newCategories) {
        if (newCategories[obj].active) activeIndex = obj;
      }

      newCategories[activeIndex].taskList.push(newTask(action.payload.task));

      return newCategories;
    }
    
    default: {
      return categories;
    }
  }
}

function newCategory(name) {
  return {
    name: name,
    taskList: [],
    id: Date.now(),
    active: true,
  };
}

function newTask(task) {
  return {
    task: task,
    complete: false,
    id: Date.now(),
  }
}

export default reducer;