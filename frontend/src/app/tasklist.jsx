"use client"
import { useState,useEffect } from "react";
import React from "react";
import {X} from "lucide-react";
import ReviewSection from "./review";



export default function Task({onlose}) {
  const [reviews, setReview] = useState([])

  useEffect(() => {
    fetchReviews()
  }, []);

  const username=localStorage.getItem("UserName");

  async function fetchReviews() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${username}`);
      if (!response.ok) {
        console.error('Error fetching movie data:', response.status);
        setReview('Movie not found'); // Fallback message
        return;
      }
      const data = await response.json();
      setReview(data.Reviews || null ); // Use fallback if no movies key
    } catch (error) {
      console.error('Fetch error:', error);
      setReview('Failed to fetch movie data');
    }
  }


    return(
      <div className="fixed bg-black bg-opacity-30 inset-0 backdrop-blur-sm z-10 flex justify-center items-center">
  <div className="mx-auto px-4 py-16 bg-white rounded-md my-9 max-h-[80vh] overflow-y-auto">
    <button onClick={onlose}>
      <X className="text-black hover:bg-red-600 hover:scale-105 hover:shadow-lg transition-all duration-300" size={30} />
    </button>
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">My activity</h1>
    <br></br>
    <h2 className="font-bold mx-9 text-black font-bold">REVIEWS ADDED</h2>
    <ReviewSection name={reviews} />
  </div>
</div>
    );
}