import { useEffect } from "react";

const useSEO = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = decodeURI(title);
    }
  }, [title]);

  useEffect(() => {
    if (description) {
      const currMetaDescription = document.querySelector(
        "meta[name='description']"
      );
      currMetaDescription.setAttribute("content", description);
    }
  }, [description]);
};

export default useSEO;
