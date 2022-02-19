import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicPagination from "../components/BasicPagination";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [type, setType] = useState("")
  const [searchTextType, setSearchTextType] = useState({
    searchBox: "",
  });
  const [page, setPage] = useState(1);
  const [movieShow, setMovieShow] = useState([]);
  const [numOfPage, setNumOfPage] = useState();

console.log(type)
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchTextType}&page=${page}&include_adult=false`
      );
      setMovieShow(data.results);
      setNumOfPage(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);


  function handelChange (event) {
    setSearchTextType(event.target.value)

    
  }
  function handelSelector (event) {
    setType(event.target.value)

    
  }


  function handelSearch (event) {
    event.preventDefault()
    fetchSearch()

    
  }

  

  const showMovies = movieShow.map(move => (
    <MovieCard
      key={move.id}
        img={move.poster_path}
        title={move.original_title || move.name}
        rating={move.vote_average}
        id={move.id}
        media_type={type ? "tv" : "movie"}
        />
  ))

  return (
    <div className="container">
      <form className="form" action="">
        <input className="search-box" 
        value={searchTextType.searchBox}
        name='searchBox'
        onChange={handelChange}
        placeholder="Search" type="text" />
        <button className="form-search-btn" onClick={handelSearch}>Shear</button>

        {/* <select className="select" id="standard-select"
        value={type}
        name="selector"
        onChange={handelSelector}
        >
          <option value="movie" >Search Movies</option>
          <option value="tv" >Search TV Series</option>
        </select> */}
      </form>

      <div className='main-container'>
      
      {showMovies}
     { 
     numOfPage === 0  ? "No" :
     <BasicPagination setPage={setPage} numOfPage={numOfPage}/>}
      
  
    </div>
    </div>
  );
}
