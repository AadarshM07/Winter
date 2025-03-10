"use client";
import "../globals.css";
import Link from "next/link";
import { AddMovies } from "../account";
import { useState } from "react";
import { useEffect } from "react";

function Movies(props) {
  
  return (
   
    
    <div className=" mx-10 my-3 flex flex-row flex-wrap gap-6">
       
      {props.name.map((movie) => (
        <Link href={`/movies/${movie.name}`} key={movie.id} className="relative overflow-hidden rounded-lg transition hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.8)] w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-1.5rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(16.666%-1.5rem)]"
>
          <img
            alt={movie.name}
            src={movie.imageUrl}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div className="p-4 sm:p-6">
              <time className="block text-xs text-white/90">{movie.releaseDate}</time>

              
                <h3  className="mt-0.5 text-lg text-white">{movie.name}</h3>
              

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                {movie.smallDescription}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>

  );
}

export default function MoviesPage(){
  const[State,NextState]=useState(false);
  const[moviesdata,setMoviesData]=useState([]);
  const[search,setSearch]=useState("");
  const [originalMovies, setOriginalMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const response = await fetch("http://127.0.0.1:5000/Movies");
    const data = await response.json();
    setMoviesData(data.Movies);
    setOriginalMovies(data.Movies);
  }


  function Search(){
    let filteredMovies=moviesdata.filter((movie) =>
      movie.name.toLowerCase().includes(search.trim().toLowerCase()))
    setMoviesData(filteredMovies);
  }
  function refreshh() {
    setMoviesData(originalMovies); 
    setSearch("");
  }




  const status=typeof window !== "undefined" && localStorage.getItem("LogedIn");

  const handleClick = () => {
    if (status) {
      NextState(true); 
    } else {
      alert("You need to Sign in to add movies.");
    }
  };
  
  
  return(
    <div>
     
      <div className="flex justify-between">
      <div className=" flex top-4 w-1/2 my-4 mx-9">
          <label htmlFor="Search" className="sr-only"> Search </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            id="Search"
            placeholder="Search for your favorite movies..."
            className="w-full rounded-md border-blue-800 text-center text-black text-2xl py-2 pe-10 shadow-sm sm:text-sm"
          />
           <button
           onClick={Search}
  className="inline-block rounded-full mx-2 border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  
>
  <span className="sr-only"> Download </span>

  <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
        </svg>
</button>
          <button
          onClick={refreshh}
           
            className="inline-block rounded-full border-2 border-indigo-600  p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 mx-1"
            
          >
            <span className="sr-only"> Download </span>

            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="size-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4.5 4.5v5h5M19.5 19.5v-5h-5M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
  />
</svg>

          </button>
         
                    
        </div>

      <div className="justify-end">
      <button
      onClick={handleClick}
      className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 my-4 mr-[130px]"
    >
      Add Movies
    </button>
    </div>
    {State && <AddMovies onClose={()=>NextState(false)} />}

    </div>

    <Movies name={moviesdata} />
    </div>
  );
}

export {Movies};
