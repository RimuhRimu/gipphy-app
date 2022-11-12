const Loader = props => 
    <svg
    className="spinner"
    id="spinner"
    width={200}
    height={175}
    viewBox="0 0 800 575"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="400" cy="400" r="50" fill="var(--brand-color1)"></circle>
  </svg>

export default Loader
