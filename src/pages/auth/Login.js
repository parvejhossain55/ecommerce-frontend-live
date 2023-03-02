import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // my hook
    const [auth, setAuth ] = useAuth()
    //hook
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            // const { data } = await axios.post(
            //     `${process.env.REACT_APP_API}/login`, { email , password,});
            // console.log("----->------>----->", data);
            // if(data?.error){
            //     toast.error(data.error)
            // }

            const { data } = await axios.post( `/login`, { email, password,});
            console.log( data);
            if(data?.error){
                toast.error(data.error)
            }

            else{
                localStorage.setItem("auth", JSON.stringify(data));
                setAuth({ ...auth, user: data.user, token: data.token });
                toast.success(" Login Successful")
                navigate( location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`);
            }
        }
        catch(error){
            console.log(error);
            toast.error(" Registration Faild. Try again.")
        }
    };

    
    return (

        <div className=''>
            <div className="my-5 d-flex justify-content-center align-items-center ">
                <div className="col-md-5 p-4 shadow-sm border rounded-5 border-primary bg-light">
                    <h2 className="text-center mb-4 text-primary">Login Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className="form-control border border-primary " 
                                placeholder="Enter your email"
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control border border-primary " 
                                placeholder="Enter your password"
                                id="exampleInputPassword1" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;