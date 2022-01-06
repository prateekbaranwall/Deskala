import React from 'react'
import "./create.css"
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function Create({setContacts}) {
    const navigate = useNavigate();
    const init = { name:"", DOB:"", age:"", email: "", state: "", pin: ""};
    const [formValues, setFormValues] = useState(init);
    const [isSubmit, setIsSubmit] = useState(false);
    const [Errors, setErrors] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);

    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        if(formValues.name === "" || formValues.DOB === "" || formValues.age === "" || formValues.email === "" || formValues.state === "" || formValues.pin === "") {
            // Errors = "All fields are requires";
            setErrors("All fields are requires");
        }
        setIsSubmit(true);
        // const { email, mobile, password } = formValues;
    };

    useEffect(() => {
        if(isSubmit && Errors === "") {
            axios.post("http://localhost:9002/create", formValues)
            .then(res => {
                // alert(res.data.message);
                alert(res.data.candidate._id )
                if(res.data.message === "Successfully Added") {
                    navigate("/homepage")
                }
            })
        }
    })

    return (
        <div>
            <div className="main1">
                <h3 id='m2'>Create Candidate</h3>
                <div className="com1">
                        <div className="des"> 
                            <label htmlFor=""> Name</label> <br />
                            <input type="text" name='name' value={formValues.name} placeholder='enter your name' onChange={handleChange} />
  
                        </div>
                        <div className="des">
                            <label htmlFor=""> Date of Birth</label> <br />
                            <input type="text" name='DOB' value={formValues.DOB} placeholder='enter your Date of Birth' onChange={handleChange}/>
         
                        </div>
                </div>
               
               <div className="com1">
                        <div className="des">
                                <label htmlFor=""> Age</label> <br />
                                <input type="text" name='age' value={formValues.age} placeholder='enter your age' onChange={handleChange}/>
                              
                            </div>
                            <div className="des">
                                <label htmlFor=""> Email Address</label> <br />
                                <input type="text" name='email' value={formValues.email} placeholder='enter your email address' onChange={handleChange}/>
                                
                        </div>
               </div>
               <div className="a1">

               <div className="com1">
                        <div className="des"><label htmlFor=""> State</label> <br />
                                <input type="text" name='state' value={formValues.state} placeholder='enter your state' onChange={handleChange}/>
                               
                            </div>
                            <div className="des"><label htmlFor=""> Pin Code</label><br />
                                <input type="text" name='pin' value={formValues.pin} placeholder='enter your 6-digit pin code' onChange={handleChange}/>
                                
                         </div>
               </div>
               <p className='valid1'>{Errors}</p>
               </div>
               

                <div className="com1" id='button'>
                   <button className="button-3" id='cancel' onClick={()=>{navigate("/homepage")}}>Cancel</button>
                   <button className="button-3"  onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}
