const getActiveCategory = (categories, searchCondition) => {
  let value;
  categories.forEach((category, index) => {
    if (category.active) {
      if (searchCondition === "getID") {
        value = category.id;
      } else if (searchCondition === "getName") {
        value = category.name;
      } else if (searchCondition === "getIndex") {
        value = index;
      }
    }
  });
  return value;
}

export default getActiveCategory;