import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminMenu from '../../components/nav/AdminMenu';
import { useAuth } from '../../context/Auth';

const AdminProfile = () => {

    const [auth, setAuth ] = useAuth()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if (auth?.user){
            const {name, email, address } = auth.user;
            setName(name);
            setEmail(email);
            setAddress(address);
        }
    },[auth?.user]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const { data } = await axios.put('/profile', {name, address, password});
            if (data.error){
                toast.error(data.error)
            }
            else{
                setAuth({ ...auth, user: data});
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated")
            }
        }
        catch(error){
            console.log(error);
        }
    }

;    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className=" col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="container-fluid">
                                            <img className="icon-nav-img-lg " alt={name}/>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-4 p-2">
                                                    <label>Profile Picture</label>
                                                    <input  placeholder="User Email" className="form-control" type="file"/>
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Name</label>
                                                    <input  
                                                        value={name}
                                                        placeholder="Enter your Name" 
                                                        className="form-control" 
                                                        onChange={(e)=> setName(e.target.value)}
                                                        type="text"
                                                        autoFocus={true}
                                                        />
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Email Address</label>
                                                    <input 
                                                        value={email} key={Date.now()}   
                                                        readOnly={true} 
                                                        placeholder="User Email" 
                                                        className="form-control" 
                                                        type="email"
                                                        onChange={(e)=> setEmail(e.target.value)}
                                                    />
                                                    
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Password</label>
                                                    <input  
                                                        placeholder="User Password" 
                                                        className="form-control" 
                                                        type="password"
                                                        value={password}
                                                        onChange={(e)=> setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Address</label>
                                                    <textarea 
                                                        placeholder="Type Your Address" 
                                                        className="form-control" type="text" 
                                                        value={address}
                                                        onChange={(e)=> setAddress(e.target.value)}
                                                        style={{height:"20px" , maxHeight:"100px"}}/>
                                                </div>
                                            </div>
                                                
                                                <button onClick={handleSubmit} className="btn col-md-4 btn-primary mt-2">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;