const { useState, useEffect } = require("react");
const { default: getCategories } = require("services/getCategories");

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (!categories.length)
      getCategories().then((categories) => setCategories(categories));
  }, []);
  return { categories };
};
export default useCategories;
