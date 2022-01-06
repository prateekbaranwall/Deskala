import React from 'react'
import "./homepage.css"
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Edit from "./edit.png";
import Delete from "./delete.png";


export default function Homepage({setIsAdd}) {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    
    const [id, setID] = useState("");

    useEffect(() => {
      getCandidate();
    }, []);

    let num = 1;


    const [users, setUser] = useState([]);
    const [total, setTotal] = useState(0);

    const handleDelete = async(e) => {
        await axios.delete(`http://localhost:9002/homepage/${id}`)
        console.log("ho gya")
        getCandidate();
    }
    
    const getCandidate = async() => {
        const resp = await axios.get('http://localhost:9002/homepage')
        console.log(resp.data);
        setUser(resp.data);
    }
    
    return (
        <div>
            <nav className='head'> Deskala - Assignment</nav>

            <div className='candidateList'> Candidates List : {users.length}</div>
            <table>
                <thead>
                    <tr>
                        <th id='idx_1'></th>
                        <th className='con_1'>Name</th>
                        <th className='con_1'>Date of Birth</th>
                        <th className='con_1'> Email</th>
                        <th className='con_1'>Result</th>
                        <th className='con_2'></th>
                    </tr>
                </thead>

                <tbody>
                    { 
                        users.map(user => (
                            <tr>
                                <td>{num++}</td>
                                <td>{user.name}</td>
                                <td>{user.DOB}</td>
                                <td>{user.email}</td>
                                <td>
                                <select name="Shortlist" id="drop">
                                    <option value="volvo">Shortlist</option>
                                </select>
                                </td>
                                <td>
                                    <img src={Edit} className='btn-1' onClick={()=>{navigate(`/edit/${user._id}`)}}/> 
                                    <img src={Delete} className='btn-1' onClick={ () => { setID(user._id); handleDelete()}  }/> 
                                </td>
                            </tr>
                            
                            ))
                        
                    }
                </tbody>
            </table>
            <span className='sw' id='new' onClick={()=>{navigate("/create")}}> Add New Candidate</span>
            
        </div>
    )
    
}
