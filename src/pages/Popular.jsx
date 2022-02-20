import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BasicPagination from '../components/Pagination/BasicPagination';
import MovieCard from '../components/MovieCard/MovieCard';

export default function Popular() {
  const [movieShow, setMovieShow] = useState([])
  const [page, setPage] = useState(1);


  const fetchMovies = async ()  => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    console.log(data)
    setMovieShow(data.results)
  
  }
  useEffect(() => {
    fetchMovies()
    window.scroll(0, 0)
  }, [page])

  const showMovies = movieShow.map(move => (
    <MovieCard
      key={move.id}
        img={move.poster_path}
        title={move.original_title || move.name}
        rating={move.vote_average}
        media_type={move.media_type}
        id={move.id}
        />
  ))
  return (
    <div>
      <div className='container'>
      <div className='head'>Popular Shows</div>
      <div className='main-container'>
          {showMovies}
          <BasicPagination setPage={setPage}/>
        </div>
      </div>
    </div>
  )
}
