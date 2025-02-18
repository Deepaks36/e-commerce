import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import axios from 'axios'
const Login = () => {
    const [login, setlogin] = useState({
        email: '',
        password: '',
        conform_password: ''
    })

    let change = (e) => {
        const { name, value } = e.target
        setlogin({ ...login, [name]: value })
    }

    let sumbit = () => {
        try {
            axios.post('http://localhost:8080/post', login)
            setlogin({
                email: '',
                password: '',
                conform_password: ''
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="container ">
                    <div className="row ">
                        <div className='col-12 '>
                                <div class="card " id='forms' style={{ width: 18 + "rem" }}>
                                    <div class="card-body ">
                                        <form action="" className='justify-content-center' >
                                            <label htmlFor="" className='mt-2 mt-lg-3'>Email</label> <br />
                                            <input type="text" name='email' value={login.email} onChange={change} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Your Email' /> <br />
                                            <label htmlFor="" className='mt-2 mt-lg-3'>Password</label> <br />
                                            <input type="text"  name='password' value={login.password} onChange={change} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Your Password' /><br />
                                        
                                                <label htmlFor="" className='mt-2 mt-lg-3'>Conform Password</label> <br />
                                                <input type="password" name='conform_password' value={login.conform_password} onChange={change} className='no-border px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-3' placeholder='Enter Conform Password' /><br />
                                                <button className='btn ms-2 ms-lg-5' style={{ fontSize: 13, color: 'orange' }}>
                                                    <span className='ms-lg-3'>
                                                        <i class="bi bi-question ms-lg-5 "></i>Forgot Password
                                                    </span>
                                                </button>
                                           
                                            <button onClick={sumbit} className=" text-center btnn px-2 py-2 px-lg-3 py-lg-2 mt-2 mt-lg-4">Sumbit</button>
                                        </form>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Login