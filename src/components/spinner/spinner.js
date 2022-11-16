const Spinner = () => (
  <svg
    className="spinner"
    id="spinner"
    width={200} height={175}
    viewBox="0 0 800 575"
  >
    <circle
      cx="400"
      cy="400"
      r="50"
      fill={`var(--brand-color${Math.trunc(Math.random() * (6 - 1) + 1)})`}
    ></circle>
  </svg>
);

export default Spinner;
