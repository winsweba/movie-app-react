import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ContentModal.css'
import { noPoster } from '../../config/config';
import Button from '@mui/material/Button';
// import Carousel from "../Carousel/Carousel";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height: "70%",
  bgcolor: 'rgb(23, 23, 56)',
  // bgcolor: 'transparent',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movieShows, setMovieShows] =useState()
  const [ trailers, setTrailers] = useState()



  const fetchData = async () => {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      console.log(data)
      setMovieShows(data)
  }

  const fetchTrailer = async () => {
    const {data} = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    

    setTrailers(data.results[0]?.key)
}

useEffect(() => {
  fetchData()
  fetchTrailer()
}, [])


  return (
    <>
      <Button  className='card-wrapper modal-btn' onClick={handleOpen}>
          {children}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Box sx={style}>
        {movieShows && (
            <div className="paper">
              <div className="ContentModal">
                <img
                  src={
                    movieShows.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movieShows.poster_path}`
                      : noPoster
                  }
                  alt={movieShows.name || movieShows.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    movieShows.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${movieShows.poster_path}`
                      : noPoster
                  }
                  alt={movieShows.name || movieShows.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {movieShows.name || movieShows.title} (
                    {(
                      movieShows.first_air_date ||
                      movieShows.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {movieShows.tagline && (
                    <i className="tagline">{movieShows.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {movieShows.overview}
                  </span>

                  {/* <div>
                    <Carousel id={id} media_type={media_type} />
                  </div> */}

                  <Button
                    variant="contained"
                    color="error"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${trailers}`}
                  >
                    Watch the Trailer
                  </Button>

                  
                </div>
              </div>
            </div>
          )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}



{/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Win
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}