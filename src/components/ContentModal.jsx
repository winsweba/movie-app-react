import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ContentModal.css'
import { noPoster } from '../config/config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
      
      setMovieShows(data)
  }

  const fetchTrailer = async () => {
    const {data} = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    console.log(data)

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
        { movieShows && 
        (
        <div>
            <img src={movieShows.poster_path?  `https://image.tmdb.org/t/p/w500/${movieShows.poster_path}` : noPoster } alt={movieShows.name || movieShows.title } />
          </div>  )
            }
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