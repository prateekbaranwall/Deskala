import React from 'react'
import Homepage from "./homepage"
import Add from "./create/create"
import {Route, Routes} from "react-router-dom";
import {useState} from "react"

export default function Home() {
    const [isAdd, setIsAdd] = useState(false);
    console.log("lo");
    return (
        <div>
           {/* <Homepage setIsAdd={setIsAdd}/> */}
             <Routes>
                <Route path="/" element={<Homepage setIsAdd={setIsAdd} />}/> 
                 {   console.log(isAdd)  }
                {  isAdd ?  <Route path="/" element={<Add/>}/> :  <Route path="/" element={<Homepage setIsAdd={setIsAdd} />}/> }
             </Routes>
        </div>
    )
}
