"use client"
import React, { useState ,useEffect} from 'react';
import {  FaThumbsUp, } from 'react-icons/fa';

const ReviewSection = (props) => {

  const[reviews,setReview]=useState(props.name);

  
  const handleLike = (id) => {
    setReview(reviews.map(review =>
      review.id === id ? { ...review, likes: review.likes + 1 } : review
    ));
  };

  const profile="https://i.ibb.co/k365XsY/Screenshot-from-2025-01-06-10-44-30.png"
  if (Array.isArray(props.name) && props.name.length > 0){
        return (

          <div className="container mx-auto lg:px-9 py-8">
            <div className="space-y-6">
              {props.name.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <img
                      src={profile}
                      alt={`${review.name}'s avatar`}
                      className="w-12 h-12 rounded-full mr-4 cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={() => handleAvatarClick(review.name)}
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                      <p className="mt-1 text-xs font-medium text-gray-600">Review for movie <span className="text-black">{review.MovieName} </span> on <span className="text-black">{review.ReviewDate}</span></p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.review}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300"
                    >
                      <FaThumbsUp className="mr-1" />
                      <span>{review.likes} Likes</span>
                    </button>
                  </div>
          
                </div>
              ))}
            </div>
          </div>
        );
      }else{
        return(<h3 className="text-red-400 mx-9 my-9 text-2x1">Be the first one to review on this</h3>)
      }
};

export default ReviewSection;
