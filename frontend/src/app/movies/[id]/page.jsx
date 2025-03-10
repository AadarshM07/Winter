"use client"
import React from "react";
import { useState,useEffect } from "react";
import "../../globals.css";
import Review from "@/app/review";
import { WriteReview } from "../../account";



export default function Dev({ params }) {
  const[state,NextState]=useState(false)
  const unwrappedParams = React.use(params); // Await the promise
  const name = unwrappedParams.id;
  const movieName = name.replace(/%20/g, " ");



  //const movie = moviesdata.find((m) => m.name === movieName);

  const[movie,setMoviesData]=useState("");
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    fetchContacts();
    if (reviews) {
      fetchReviews();
    }
  }, [reviews]);
  

  async function fetchReviews() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/review/${movieName}`);
      if (!response.ok) {
        console.error('Error fetching movie data:', response.status);
        setReview('Movie not found'); 
      }
      const data = await response.json();
      setReview(data.Reviews || null )
    } catch (error) {
      console.error('Fetch error:', error);
      setReview('Failed to fetch movie data');
    }
  }

  

  async function fetchContacts() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/sendMovies/${movieName}`);
      if (!response.ok) {
        console.error('Error fetching movie data:', response.status);
        setMoviesData('Movie not found'); // Fallback message
        return;
      }
      const data = await response.json();
      setMoviesData(data.Movies ); // Use fallback if no movies key
    } catch (error) {
      console.error('Fetch error:', error);
      setMoviesData('Failed to fetch movie data');
    }
  }

  const status=typeof window !== "undefined" && localStorage.getItem("LogedIn");

  const handleClick = () => {
    if (status) {
      NextState(true); 
    } else {
      alert("You need to Sign in to add reviews.");
    }
  };

  
  
 
  if(!movie){
    return(
      <h1>hi {movieName}</h1>
    );
  }

  return (
    <div>
   <div className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:mx-9">
  <div className="flex flex-col md:flex-row md:gap-40">
    <div className="object-cover mb-6 md:mb-0">
      <img 
        src={movie.weburl} 
        className="w-full max-w-md h-[300px] sm:h-[400px] md:w-[600px] md:h-[500px] object-cover rounded-lg transition-all duration-300 blur-sm hover:blur-none" 
        alt={movie.name} 
      />
    </div>

    <div className="flex-1">
      <div className="max-w-full">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          {movie.name}
        </h2>

        <h3 className="mt-4 text-white">
          <span className="text-yellow-500">Genre:</span> {movie.genre}
        </h3>
        <h3 className="mt-4 text-white">
          <span className="text-yellow-500">Country:</span> {movie.country}
        </h3>
        <h3 className="mt-4 text-white">
          <span className="text-yellow-500">Cast:</span> {movie.cast}
        </h3>
        <h3 className="mt-4 text-white">
          <span className="text-yellow-500">Director:</span> {movie.director}
        </h3>
        <h3 className="mt-4 text-white">
          <span className="text-yellow-500">Production:</span> {movie.production}
        </h3>
        <h3 className="mt-4 text-white">
          <span className="text-yellow-500">Description:</span> {movie.smallDescription}
        </h3>
      </div>
    </div>
  </div>
</div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[800px_1fr] lg:gap-8 mx-9 sm:mx-1 my-5">
      <div className="h-180 rounded-lg ">
      <div className="flex items-center justify-between lg:mx-9 sm:mx-1 s-2  my-4">
        <h1 className="text-white lg:text-2xl font-bold sm:text">RECENT REVIEWS</h1>
        <button
          onClick={handleClick}
          className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
        >
          Add reviews
        </button>
        {state && <WriteReview   onClose={() => { NextState(false); }}  movie={movieName} />}
      </div>

        <div className="flex flex-row flex-wrap">
        <Review name={reviews}/>
        
        </div>
        
      </div>
      
    </div>


</div>



  );
}
