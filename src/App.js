import { useEffect,useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import AllMovies from "./pages/AllMovies";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular";
import Search from "./pages/Search";
import TVShows from "./pages/TVShows";

function App() {
  const [movieShow, setMovieShow] = useState([])
  const [searchMovie, setSearchMovie] = useState('')
  // console.log(movieShow)
  // const [loading, setLoading] = useState(false)
  // const [movieWatch, setMovieWatch] = useState(
  //   JSON.parse(localStorage.getItem("watchlist"))
  // ||[])
  // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d116349836bf0b606019b092daa14b19
  // https://image.tmdb.org/t/p/w500/
  // https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg
  // /search
   //http://api.themoviedb.org/3/search/movie?api_key=d116349836bf0b606019b092daa14b19&query=hard

  //  /discover/movie?primary_release_year=2010&sort_by=vote_average.desc



  useEffect(() => {
    getAllMovies()
    // makeSearch()
    // localStorage.setItem("watchlist", JSON.stringify(getIdToTry()))
    // setDataToStorage()
  },[])

  function getAllMovies() {
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d116349836bf0b606019b092daa14b19')
    .then(res => res.json())
    .then(data => setMovieShow(data.results))
  }

  function getAllMovie() {
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d116349836bf0b606019b092daa14b19')
    .then(res => res.json())
    .then(data => data)
  }

  function makeSearch() {
    // setLoading(true)
    fetch(`http://api.themoviedb.org/3/search/movie?api_key=d116349836bf0b606019b092daa14b19&query=${searchMovie}`)
    .then(res => res.json())
    .then(data => setMovieShow(data.results))
  }

  function handelSearch(event) {
    event.preventDefault()
    makeSearch()
  }

  function settingMovie(event){
    setSearchMovie(event.target.value)
  }




  const setDataToStorage = () => {
    try{
      const d =  getAllMovie()
      localStorage.setItem("watchList", JSON.stringify(d)
    )
    }catch(error) {
        console.log(error);
    }
}







  function getIdToTry (id) {
    // console.log(id)
  //  setMovieWatch( movieWatch.filter( (movie) => movie.id !==  id))

  setMovieShow(prevMovieState => (
    prevMovieState.filter(movie => movie.id !== id)
  ) )

  }
    const mainCard = movieShow.map(movie => (
      <MovieCard
      key={movie.id}
      img={movie.poster_path}
      title={movie.original_title}
      rating={movie.vote_average}
      handelWatch={() => setDataToStorage ()}
      />
    ))
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar
      onChange={settingMovie}
      value={searchMovie}
      handelClick={handelSearch}
      />
      
      <div>
      {/* <div className="main-container"> */}
     
     {/* {mainCard} */}
      
     <Routes>
       <Route path="/" element={<AllMovies />}  />
       <Route path="/popular" element={<Popular />} />
       <Route path="/tvShows" element={<TVShows />} />
       <Route path="/movies" element={<Movies />} />
       <Route path="/search" element={<Search />} />
     </Routes>
     </div>
     </div>
     
    {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
