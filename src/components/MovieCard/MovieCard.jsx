import React from 'react'
// import Image from "../images/convert.png"
import ContentModal from '../ContentModal/ContentModal'
import './MovieCard.css'
import { noPoster } from '../../config/config'




export default function MovieCard({id, img, title, rating, media_type}) {
  const rateStyle ={
    color: rating > 6 ?  "rgb(245, 169, 17)" : "rgb(218, 91, 91)"
  }
  return (
    <>
        <ContentModal media_type={media_type} id={id} >
        <img  className='img-cover' src={img?  `https://image.tmdb.org/t/p/w500/${img}` : noPoster } alt="" />
        <div className='title'>
          <div className='main-title'>{title}</div>
         <div className='rating' style={rateStyle } >{rating}</div>
         </div>
         <div className='media-type'>{media_type === "tv" ? "TV Series" : "Movie"}</div>





        {/* <div className='card-wrapper'>
        <img  className='img-cover' src={`https://image.tmdb.org/t/p/w500/${props.img}`} alt="" />
        <div className='title'>
          <div className='main-title'>{props.title}</div>
         <div className='rating'>{props.rating}</div>
         </div>
        <button onClick={props.handelWatch}>Love</button>
        
    </div>         */}
    </ContentModal>
    </>
  )
}

