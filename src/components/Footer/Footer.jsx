import "./Footer.css";

const Footer = (props) => {
  const { handleNextPage, handlePreviousPage, page } = props;
  return (
    <footer className="footer">
      <button className="popular btn" onClick={handlePreviousPage}>
        Previous
      </button>

      <span>{page}</span>

      <button className="popular btn" onClick={handleNextPage}>
        Next
      </button>
    </footer>
  );
};
export default Footer;
