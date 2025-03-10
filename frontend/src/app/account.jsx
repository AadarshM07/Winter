"use client";
import { useState,useEffect,useRef } from "react";
import "./globals.css";
import {X} from "lucide-react";
import { Menu } from 'lucide-react';
import Task from "./tasklist";


function TextLine(props){  //changed to type here props
  return(
    <div>
      <label htmlFor={props.name} className="sr-only">{props.name}</label>  

      <div className="relative">
        <input
          type={props.type}
          id={props.name}
          value={props.value}
          onChange={props.onchange}
          className={props.class}
          placeholder={props.placeholder}
          required
        />
      </div>
    </div>
  );
}


function Login({onClose}){
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[alertt,setAlert]=useState("")
  const[suss,setSuss]=useState("")
  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
        email,
        password
    }
    const url = "http://127.0.0.1:5000/login"       //url to send the data
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      setAlert(data.error || "user email or password doesnt match.Please Try again"); 
      setTimeout(() => setAlert(""), 5000);
    } else {
      setAlert("");
    }

    if (response.status == 201 || response.status == 200){
      const data = await response.json();
      setSuss("User Authentication Sucessfull"); 
      if (typeof window !== "undefined") {
        localStorage.setItem("LogedIn", "true");
        localStorage.setItem("UserName", data.name);
        localStorage.setItem("Email", data.email);
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    }

  }

  return(
      <div className="fixed bg-black bg-opacity-30 inset-0 backdrop-blur-sm z-10 ">
      <div className="mx-auto w-1/3  px-4 py-16 bg-white rounded-md my-9">
      <button onClick={onClose}><X className="text-black  hover:bg-red-600 hover:scale-105 hover:shadow-lg transition-all duration-300" size={30} /></button>
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Welcome back!</h1>
    
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
        Sign in to share your reviews and shape the cinematic conversation!
        </p>
    
        <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium text-black">Sign in to your account</p>
    
          <TextLine onchange={(e) => setEmail(e.target.value)} value={email} name="email" type="email" placeholder="Enter email" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
          <TextLine onchange={(e) => setPassword(e.target.value)} value={password} name="password" type="password" placeholder="Enter password" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
          {alertt && (<p className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded mt-4 mx-2">
            {alertt}
          </p>)}
          {suss && (<p className="bg-green-100 text-green-700 border border-green-400 px-4 py-2 rounded mt-4 mx-2">
            {suss}
          </p>)}
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          >
            Sign in
          </button>
          
        </form>
      </div>
    </div>
  );
}




function CreateAccount({onClose}){
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[alertt,setAlert]=useState("")
  const[suss,setSuss]=useState("")


  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
        name,
        email,
        password
    }
    const url = "http://127.0.0.1:5000/register"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)

    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      setAlert(data.message || "User Already Exist..Sign In your account!"); 
      setTimeout(() => setAlert(""), 5000);
    } else {
      setAlert("");
    }

    if (response.status == 201 || response.status == 200){
      setSuss(data.message || "Account created!You are Sign Ined"); 
      localStorage.setItem("LogedIn",true)
      localStorage.setItem("UserName",data.name)   
      localStorage.setItem("Email",data.email)
      setTimeout(() => {
        onClose();
      }, 3000);
      

    }

  }

  return(
       <div className="fixed bg-black bg-opacity-30 inset-0 backdrop-blur-sm z-10 ">
      <div className="mx-auto w-1/3  px-4 py-16 bg-white rounded-md my-9">
      <button onClick={onClose}><X className="text-black  hover:bg-red-600 hover:scale-105 hover:shadow-lg transition-all duration-300" size={30} /></button>
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>
      
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Step into the spotlight and join a community of passionate movie reviewers!
          </p>
      
          <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium text-black">Create your Account</p>
            
            <TextLine onchange={(e) => setName(e.target.value)} value={name} name="name" type="name" placeholder="Enter Name" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
            <TextLine onchange={(e) => setEmail(e.target.value)} value={email} name="email" type="email" placeholder="Enter Email" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
            <TextLine onchange={(e) => setPassword(e.target.value)} value={password} name="Password" type="password" placeholder="Enter Password" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
            {alertt && (<p className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded mt-4 mx-2">
            {alertt}
            </p>)}
            {suss && (<p className="bg-green-100 text-green-700 border border-green-400 px-4 py-2 rounded mt-4 mx-2">
            {suss}
             </p>)}
            
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          >
            
              Sign Up
            </button>
      
            
          </form>
        </div>
      </div>
    );
}

function AddMovies({onClose}){
  const [imageUrl, setImageUrl] = useState("");
  const [weburl, setWeburl] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [name, setName] = useState("Inception");
  const [smallDescription, setSmallDescription] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);
  const [production, setProduction] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");
  const[alertt,setAlert]=useState("")
  const[suss,setSuss]=useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      name,
      smallDescription,
      imageUrl,
      releaseDate,
      genre,
      weburl,
      rating,
      director,
      cast,
      production,
      country
    }
    const url = "http://127.0.0.1:5000/Movies"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)

    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      setAlert(data.message ); 
      setTimeout(() => setAlert(""), 5000);
    } else {
      setAlert("");
    }

    if (response.status == 201 || response.status == 200){
      setSuss("Movie details Added"); 
      setTimeout(() => {
        onClose();
      }, 2000);

    }

  }

  return(
    <div className="fixed bg-black bg-opacity-30 inset-0 backdrop-blur-sm z-10 ">
   <div className="mx-auto w-1/2  px-4 py-16 bg-white rounded-md my-9">
   <button onClick={onClose}><X className="text-black  hover:bg-red-600 hover:scale-105 hover:shadow-lg transition-all duration-300" size={30} /></button>
     <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Hello there!</h1>
 
     <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
     Add your favorite movies to Winter! Simply sign in to contribute and share your recommendations with others. Your input makes Winter even better!
     </p>
 
     <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
       <p className="text-center text-lg font-medium text-black">Fill the necessary details</p>
       <div className="flex flex-row flex-wrap gap-4">
       <TextLine onchange={(e) => setName(e.target.value)} value={name} name="movieName" type="text" placeholder="Enter Movie Name" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setImageUrl(e.target.value)} value={imageUrl} name="imageUrl" type="url" placeholder="Enter Image URL" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setWeburl(e.target.value)} value={weburl} name="weburl" type="url" placeholder="Enter second Image URL" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setReleaseDate(e.target.value)} value={releaseDate} name="releaseDate" type="date" placeholder="Enter Release Date" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setSmallDescription(e.target.value)} value={smallDescription} name="smallDescription" type="text" placeholder="Enter Small Description" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setRating(e.target.value)} value={rating} name="rating" type="number" placeholder="Enter Rating (max-10)" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setDirector(e.target.value)} value={director} name="director" type="text" placeholder="Enter Director Name" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setCast(e.target.value)} value={cast} name="cast" type="text" placeholder="Enter Cast (comma-separated)" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setProduction(e.target.value)} value={production} name="production" type="text" placeholder="Enter Production House" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setCountry(e.target.value)} value={country} name="country" type="text" placeholder="Enter Country" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        <TextLine onchange={(e) => setGenre(e.target.value)} value={genre} name="genre" type="text" placeholder="Enter Genre (comma-separated)" class="w-[300px] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black" />
        </div>
        {alertt && (<p className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded mt-4 mx-2">
            {alertt}
            </p>)}
        {suss && (<p className="bg-green-100 text-green-700 border border-green-400 px-4 py-2 rounded mt-4 mx-2">
            {suss}
             </p>)}
       <button
         type="submit"
         className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
       >
         Proceed
       </button>
       
     </form>
   </div>
 </div>
);



}



function WriteReview({onClose,movie}){
  const [review, setReview] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("");
  const username = typeof window !== "undefined" ? localStorage.getItem("UserName") : null;


  

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username:username,
      moviename:movie,
      review
    };

    const url = "http://127.0.0.1:5000/reviews";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    
    if (response.ok) {
      setSuccess("Review published successfully!");
      setAlert("");
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } else {
      const errorData = await response.json();
      setAlert(errorData.message || "Something went wrong!");
      setSuccess("");
    }
  };

  return(
  <div className="fixed bg-black bg-opacity-30 inset-0 backdrop-blur-sm z-10 ">
      <div className="mx-auto w-1/3  px-4 py-16 bg-white rounded-md my-9">
      <button onClick={onClose}><X className="text-black  hover:bg-red-600 hover:scale-105 hover:shadow-lg transition-all duration-300" size={30} /></button>
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Feel what you write</h1>
      
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">Name: {username}</p>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">MovieName: {movie}</p>
         

          
      
          
        <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700"></label>
          <textarea id="review" onChange={(e) => setReview(e.target.value)} name="review" value={review} rows="7" className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" placeholder="Write your feedback here..."></textarea>
          {alert && (<p className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded mt-4 mx-2">
              {alert}
              </p>)}
          {success && (<p className="bg-green-100 text-green-700 border border-green-400 px-4 py-2 rounded mt-4 mx-2">
              {success}
              </p>)}`
          <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">Publish</button>
        </form>

        </div>
      </div>
  );
    
}


function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(false);
  const dropdownRef = useRef(null);
  const[click,setClick]=useState(true);


  function handleLogout() {
    console.log("hi");
    localStorage.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
       onClick={() => {
        setIsOpen(true);
        setClick(false);
      }}
        className="text-black transition hover:text-gray-500/75"
      >
        <Menu size={35} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef} 
          className="bg-white absolute top-20 flex flex-col items-start rounded-lg p-2 w-[200px] z-10"
        >
          <button
            className="flex w-full justify-between hover:bg-blue-300 hover:shadow-lg hover:border-l-blue-500 cursor-pointer 
            rounded-r-lg border-l-transparent p-4 transition-all duration-300 text-black"
            type="button"
            onClick={() => {
              setState(true);
            }}
          >
            My Activity
          </button>

          {state && <Task onlose={() => setState(false)} />}

          <button
            onClick={handleLogout}
            type="button"
            className="flex w-full justify-between hover:bg-blue-300 hover:shadow-lg text-red-400 text-l hover:border-l-blue-500 cursor-pointer rounded-r-lg border-l-transparent p-4 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}


function AccountStatus(){
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("LogedIn");
const username = typeof window !== "undefined" ? localStorage.getItem("UserName") : null;
const email = typeof window !== "undefined" ? localStorage.getItem("Email") : null;
  if(isLoggedIn){
    return(
      <div>
      <p className="mx-1 text-black text-xs sm:text-sm truncate">{username}</p>
      <p className="mx-1 text-black text-xs sm:text-sm truncate">{email}</p>
    </div>
    );}
  else{
    return(
      <p className="mx-1 text-black text-xs sm:text-sm text-center  truncate">unconnected</p>
    );
  }
  
}

function FetchMovies(){
  const [moviesdat, setMoviesData] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/Movies");
      const data = await response.json();
      setMoviesData(Array.isArray(data.Movies) ? data.Movies : []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMoviesData([]); 
    }
  let moviesdata=moviesdat;
  return moviesdata;
  };
}




export {Login,CreateAccount,DropDown};
export {WriteReview};
export {AddMovies};
export {AccountStatus};
export {FetchMovies};