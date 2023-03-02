import React from 'react';
import AdminMenu from '../../components/nav/AdminMenu';
import { useAuth } from '../../context/Auth';
import image from "../../assets/image/dashboard.svg"

const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Information</div>

                    <img className='w-50 mx-auto d-block mt-5' src={image} alt=""/>
                    
                    {/* <ul className="list-group">
                    <li className="list-group-item">{auth?.user?.name}</li>
                    <li className="list-group-item">{auth?.user?.email}</li>
                    <li className="list-group-item">Admin</li>
                    </ul> */}
                </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;