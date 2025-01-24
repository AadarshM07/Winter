"use client";
import "./globals.css";
import Link from "next/link";
import {Login,CreateAccount,DropDown,AccountStatus} from "./account.jsx"
import {useState,useRef} from "react";




function Headere() {
  const[LoginState,NextState]=useState(false);
  const[signState,signNextState]=useState(false);

  
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
        
          <div className="flex md:flex md:items-center md:gap-12">
            <p className="text-rose-950 font-bold text-2xl">Winter</p>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm"> {/*Make sure the routing problem is correct*/}
                <li>
                  <Link className="text-black transition hover:text-gray-500/75 text-xl" href="/"> Home </Link>
                </li>

                <li>
                  <Link className="text-black transition hover:text-gray-500/75 text-xl" href="/movies"> Movies </Link>
                </li>

                <li>
                  <button className="text-black transition hover:text-gray-500/75 text-xl" onClick={()=>NextState(true)}> Sign In </button>
                </li>
                {LoginState && <Login onClose={()=>NextState(false)} />}
               
                <li>
                  <button className="text-black transition hover:text-gray-500/75 text-xl" onClick={()=>signNextState(true)}> Create Account</button>
                </li>
                {signState && <CreateAccount onClose={()=>signNextState(false)} />}
                <li>
                  <Link className="text-black transition hover:text-gray-500/75 text-xl" href="/top-imdb"> Top imdb </Link>
                </li>
                <li>
                  <DropDown />
                </li>
               
              </ul>
            </nav>
          </div>
          <div className="border border-black border-dashed rounded-md w-[150px] h-[40px] bg-green-200 hover:bg-green-500 transition duration-200 flex flex-col  overflow-hidden">
           <AccountStatus />
          </div>



        </div>
      </div>
    </header>
  );
}

function Footere() {
  return (
 
    
    <footer className="bg-gray-50 mt-auto ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <p className="text-rose-950 font-bold text-2xl">Aadarsh_M07</p>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  
  );
}

export default function Heading({children}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col justify-between bg-slate-900">
        <Headere />

        {children}

        <Footere />
      </body>
    </html>
  );
}

export {Headere,Footere};


