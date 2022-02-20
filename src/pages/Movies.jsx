import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BasicPagination from '../components/Pagination/BasicPagination';
import ChipsAction from '../components/Chipping/ChipingAcation';
import MovieCard from '../components/MovieCard/MovieCard';
import useGenre from './hooks/useGenre';


export default function Movies() {
  const [movieShow, setMovieShow] = useState([])
  const [numOfPage, setNumOfPage] =  useState()
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);


  const fetchData = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    )

    setMovieShow(data.results)
    setNumOfPage(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0,0)
    fetchData()
    // eslint-disable-next-line
  },[genreforURL,page])

  const showMovies = movieShow.map(move => (
    <MovieCard
      key={move.id}
        img={move.poster_path}
        title={move.original_title || move.name}
        rating={move.vote_average}
        media_type="movie"
        id={move.id}
        />
  ))
  return (
    <div className='container'>
      <div className='head'>Movie Shows</div>

      <ChipsAction
      type="tv"
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      genres={genres}
      setGenres={setGenres}
      setPage={setPage}
      />

<div className='main-container'>
      
      {showMovies}
     { 
     numOfPage === 0  ? <div className='no-result'>No Result Found</div>  :
     <BasicPagination setPage={setPage} numOfPage={numOfPage}/>}
      
  
    </div>
    </div>
  )
}
