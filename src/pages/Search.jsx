import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicPagination from '../components/Pagination/BasicPagination';
import MovieCard from "../components/MovieCard/MovieCard";

export default function Search() {
  const [searchTextType, setSearchTextType] = useState({
    searchBox: "",
  });
  const [page, setPage] = useState(1);
  const [movieShow, setMovieShow] = useState([]);
  const [numOfPage, setNumOfPage] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
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
  }, [page]);


  function handelChange (event) {
    setSearchTextType(event.target.value)

    
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
        media_type="movie"
        />
  ))

  return (
    <div className="container">
      <div className='head'>Search Movies</div>
      <form className="form" action="">
        <input className="search-box" 
        value={searchTextType.searchBox}
        name='searchBox'
        onChange={handelChange}
        placeholder="Search" type="text" />
        <button className="form-search-btn" onClick={handelSearch}>Shear</button>
      </form>

      <div className='main-container'>
      
      {showMovies}
     { 
     numOfPage === 0  ? <div className='no-result'>Search new movie here........ or maybe  result not found</div> :
     <BasicPagination setPage={setPage} numOfPage={numOfPage}/>}
      
  
    </div>
    </div>
  );
}
