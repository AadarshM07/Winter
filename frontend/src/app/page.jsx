"use client"
import { useEffect,useState } from "react";
import "./globals.css"
import {Movies} from "./movies/page";
import ShinyText from "./shinytext";

export default function Home() {
  const[movies,setMovies]=useState([])
  const[home,setHome]=useState([]);

  useEffect(() => {
    fetchPopular()
    fetchHomePage()
  }, []);

  

  async function fetchPopular() {
    try {
      const response = await fetch("http://127.0.0.1:5000/recentmovies");
      if (!response.ok) {
        console.error('Error fetching movie data:', response.status);
      }
      const data = await response.json();
      setMovies(data.Movies || null ); 
    } catch (error) {
      console.error('Fetch error:', error);
      setMovies('Failed to fetch movie data');
    }
  }

  async function fetchHomePage(){
    try{
      const response=await fetch("http://127.0.0.1:5000/homepage");
      if(!response.ok){
        console.error('error fetching data ffor homepage');
      }
      const data=await response.json();
      setHome([data.users,data.movies,data.reviews]);

    }catch (error) {
      console.error('Fetch error:', error);
      setMovies('Failed to fetch homoepage data');
    }
  }



  return (
   <div className="lg:mx-[50px]">
    <div className="mx-auto max-w-screen-xl px-4 py-8   lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
        <ShinyText text="Trusted by Movie Community" className="text-yellow" />

        </h2>

        <p className="mt-4 text-gray-500 sm:text-xl dark:text-gray-400">
            <ShinyText text="Track films you’ve watched.
              Save those you want to see.
              Tell your friends what’s good." />
        </p>
      </div >
      <dl className="mt-6 grid grid-cols-1 gap-4  place-content-center sm:grid-cols-2 lg:grid-cols-3">
        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center transition hover:shadow-lg hover:bg-yellow-200 dark:border-gray-800"
        >
          <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">Total users</dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{home[0]}</dd>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center transition hover:shadow-lg hover:bg-yellow-200 dark:border-gray-800"
        >
          <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
            Total movies
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{home[1]}</dd>
        </div>
        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center transition hover:shadow-lg hover:bg-yellow-200 dark:border-gray-800"
        >
          <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">Total reviews</dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{home[2]-1}+</dd>
        </div>
      </dl>
    </div>
    <br></br>
    <br></br>

    <div>
      <h1 className="font-bold mx-9 my-9">RECENT MOVIES</h1>
      <Movies name={movies} />
    </div>

    </div>
    

    
    );
  }