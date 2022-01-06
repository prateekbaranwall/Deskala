import React from 'react'
import "./sign_up.css"
import axios from "axios"
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

export default function Homepage() {
    const navigate = useNavigate();
    const init = { email: "", mobile: "", password: "" };
    const [formValues, setFormValues] = useState(init);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);

    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        // const { email, mobile, password } = formValues;
    };

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            console.log("eureka!!!");
            axios.post("http://localhost:9002/", formValues)
            .then(res => {
                alert(res.data.message)
                navigate("/login")        
            })
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {}
        const regex_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).{4,8}$/;

        if (!values.email || !regex_email.test(values.email)) {
            errors.email = "Enter a Valid email id";
        }
        if (!values.mobile || values.mobile.length !== 10) {
            errors.mobile = "Enter a Valid mobile number";
        }
        if (!values.password || !regex_password.test(values.password)) {
            errors.password = "Enter a Valid password";
        }
        return errors;
    };

    return (
        <div>
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            <h2>Deskala - Assignment</h2>
            <div className="main">
                <h3>Sign Up</h3>
                <div className="des">Email Id <br />
                    <input type="email" name='email' placeholder='enter your email id' value={formValues.email} onChange={handleChange} />
                    <p className='valid'>{formErrors.email}</p>
                </div>
                <div className="des">Phone Number <br />
                    <input type="phone" name='mobile' placeholder='enter your phone number' value={formValues.mobile} onChange={handleChange} />
                    <p className='valid'>{formErrors.mobile}</p>
                </div>
                <div className="des">Password <br />
                    <input type="password" name='password' placeholder='enter password' value={formValues.password} onChange={handleChange} />
                    <p className='valid'>{formErrors.password}</p>
                    <p id="des1">Minimum 8 Alpha numeric</p>
                </div>

                <button className="button-3" onClick={handleSubmit}>Sign Up</button>
                <div className="foot">Already registered?
                    <span className='sw' onClick={()=>{navigate("/login")}}> Log in</span>
                </div>
            </div>


        </div>
    )
}
