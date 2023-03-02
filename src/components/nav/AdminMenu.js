import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className=''>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Links</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/profile">
                    Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/category">
                    Create category
                    </NavLink>
                </li>

                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/product">
                    Create product
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/products">
                    In house products
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/orders">
                        Manage orders
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;