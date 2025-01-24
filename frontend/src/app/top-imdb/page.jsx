"use client"
import { useState,useEffect } from "react";

import "../globals.css";
import { useMemo } from "react";



export default function Imdb(){
    const[moviesdat,setMoviesData]=useState("")

    useEffect(() => {
        fetchContacts()
    }, []);

    async function fetchContacts() {
        const response = await fetch("http://127.0.0.1:5000/Movies");
        const data = await response.json();
        setMoviesData(data.Movies);
    }

    const moviesdata = Array.isArray(moviesdat) ? moviesdat : [];
  
    const sortedMovies = useMemo(() => {
        return [...moviesdata].sort((a, b) => b.rating - a.rating);
      }, [moviesdata]);

    return(
        <div className="flex flex-col items-center lg:mx-3">
        <h1 className="text-2xl font-bold mb-10 my-7">TOP IMDB</h1>
        <div className="flex flex-wrap justify-center gap-6 my-5">
            {sortedMovies.map((movie) => (
                <article
                    key={movie.name}
                    className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 w-72 transition hover:shadow-lg hover:bg-yellow-200"
                >
                    <span>
                        <img
                            alt={movie.name}
                            src={movie.imageUrl}
                            className="rounded-full w-20 h-20 object-cover"
                        />
                    </span>
    
                    <div>
                        <p className="text-2xl font-medium text-gray-900">⭐ {movie.rating}/10</p>
                        <p className="text-sm text-gray-500">{movie.name}</p>
                    </div>
                </article>
            ))}
        </div>
    </div>
    
    );
}