import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import './MegaCategories.css'

const MegaCategories = () => {
    const categories = useCategory();

    return (
        <Fragment>
            <li className="nav-item mega-dropdown">
                <NavLink className="nav-link dropdown-toggle"  to="/categories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
                </NavLink>
                <div className="dropdown-menu ">
                <li className=''>
                    <NavLink className="nav-link" to="/categories">
                    All Categories
                    </NavLink>
                </li>
                    {categories?.map((c) => (
                        <li className='w-50'>
                        <NavLink className="nav-link " to={`/category/${c.slug}`}>
                            {c.name}
                        </NavLink>
                        </li>
                    ))}
                </div>
                {/* <div className="dropdown-menu ">
                    <ul>
                        <li><a className="dropdown-item" href="#">Action</a></li>
                    </ul>
                </div> */}
            </li>
        </Fragment>
    );
};

export default MegaCategories;