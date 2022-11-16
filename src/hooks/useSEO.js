import { useEffect, useState } from "react";

const useSEO = ({ title, description }) => {
  const [prevDescription, setDescription] = useState(description);
  useEffect(() => {
    if (title) {
      document.title = decodeURI(title);
      return;
    }
  }, [title]);

  useEffect(() => {
    const currMetaDescription = document.querySelector(
      "meta[name='description']"
    );
    currMetaDescription.setAttribute("content", description);
    // console.log(currMetaDescription,prevDescription)
  }, [description]);
};

export default useSEO;
