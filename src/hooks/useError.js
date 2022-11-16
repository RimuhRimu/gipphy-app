const { useState } = require("react");

const useError = () => {
  const [error, setError] = useState();
  return { error, setError };
};
