import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import Loading from './Loading';

const PrivetRoute = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [ok, setOk] = useState();

    useEffect(()=>{
        const authCheck = async ()=>{
            const {data} = await axios.get(`/auth-check`);
            // const {data} = await axios.get(`/auth-check`, {headers: {authorization:auth?.token}});
            if(data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        };
        if(auth?.token) authCheck();
    },[auth?.token]);

    return ok ? <Outlet/> : <Loading></Loading>

};

export default PrivetRoute;