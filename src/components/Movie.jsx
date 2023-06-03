const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const Movie = (props) => {
  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else return "red";
  };

  const { title, poster_path, overview, vote_average } = props;
  return (
    <div className="movie">
      <img src={IMG_PATH + poster_path} alt={title} />

      <div className="movie-info">
        <h3>{title}</h3>
        <span className={getClassByRate(vote_average)}>
          {vote_average.toFixed(1)}
        </span>
      </div>

      <div className="overview">
        <h3>Overview</h3>
        {overview}
      </div>
    </div>
  );
};
export default Movie;
