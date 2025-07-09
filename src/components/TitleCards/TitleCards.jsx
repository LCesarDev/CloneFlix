import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const[apiData, setApiData] = useState([]);

const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDE5YTQxZDNlZWI1MDgzZWRjMTE5NjY3OGQzOTY2OCIsIm5iZiI6MTc1MDg3MjAxNi4zNTUsInN1YiI6IjY4NWMyZmQwNjMyNThiNDYyOTBlMzI2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESazS8g0EMepQe2gHaO0yuFYt336EDzVKFNECv3_wYo'
  }
};



const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500' +card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
