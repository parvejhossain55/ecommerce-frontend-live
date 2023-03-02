import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import Loading from './Loading';

const AdminRoute = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [ok, setOk] = useState();

    useEffect(()=>{
        const adminCheck = async ()=>{
            const {data} = await axios.get(`/admin-check`);
            // const {data} = await axios.get(`/admin-check`, {headers: {authorization:auth?.token}});
            if(data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        };
        if(auth?.token) adminCheck();
    },[auth?.token]);

    return ok ? <Outlet/> : <Loading path="" />

};

export default AdminRoute;