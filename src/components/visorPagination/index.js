import Spinner from "components/spinner/spinner";
import useNearScreen from "hooks/useNearScreen";
import debounce from "just-debounce-it";
import { useCallback, useEffect, useRef } from "react";

const VisorPagination = ({ setPage }) => {
  const visorRef = useRef();
  const { isNearScreen: isIntersecting } = useNearScreen({
    distance: "1000px",
    externalRef: visorRef,
    once: false,
  });
  const handlerDebounce = useCallback(
    debounce(() => setPage((lastpage) => lastpage + 1), 1000),
    []
  );

  useEffect(() => {
    handlerDebounce();
  }, [isIntersecting, handlerDebounce]);

  return (
    <>
      {isIntersecting ? <Spinner></Spinner> : null}
      <div className="visor" ref={visorRef}></div>
    </>
  );
};
export default VisorPagination;
