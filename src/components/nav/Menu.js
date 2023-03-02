import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import useCategory from '../hooks/useCategory';
import SearchForm from '../forms/SearchForm';
import { Badge } from 'antd';

import { useCart } from '../../context/Cart';

const Menu = () => {
    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    //hook
    const categories = useCategory();
    const navigate = useNavigate();

    const logout = ()=> {
        setAuth({ ...auth, user: null, token: "" })
        localStorage.removeItem("auth")
        navigate("/login")
    }

    return (
        <div className='sticky-top'>
            <ul className="nav d-flex px-5 shadow-sm mb-2 bg-light zindex-sticky">
                <li className="nav-item d-flex align-items-center me-5">
                <a className="navbar-brand text-primary" aria-current="page" href="/">
                    <i class="fa-brands fa-shopify"></i>
                    <b>eShop</b>
                </a>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                    HOME
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/shop">
                    SHOP
                </NavLink>
                </li>

                <div className="dropdown">
                    <li>
                        <a
                        className="nav-link pointer dropdown-toggle"
                        data-bs-toggle="dropdown"
                        >
                        CATEGORIES
                        </a>

                        <ul
                        className="dropdown-menu"
                        style={{ height: "300px", width: "200px", overflow: "scroll" }}
                        >
                        <li>
                            <NavLink className="nav-link" to="/categories">
                            <p className='text-dark fs-5 fw-bold'>All Categories</p>
                            </NavLink>
                        </li>

                        {categories?.map((c) => (
                            <li key={c._id} >
                            <NavLink className="nav-link" to={`/category/${c.slug}`}>
                                <p className='text-dark'>{c.name}</p>
                            </NavLink>
                            </li>
                        ))}
                        </ul>
                    </li>
                </div>

                <li className="nav-item">
                    <Badge 
                        className='fs-6 pt-1'
                        count={cart?.length >=1 ? cart.length : 0}
                        offset={[-5, 11]}
                        size="small"
                        showZero={true}
                    >
                        <NavLink className="nav-link " aria-current="page" to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                            CART
                        </NavLink>
                    </Badge>
                </li>

                {/* <MegaCategories/> */}
                
                <div className=' d-flex ms-auto'>
                <SearchForm/>
            
                {!auth?.user ? (
                <>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                        LOGIN
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                        REGISTER
                    </NavLink>
                    </li>
                </>
                ) : (
                <div className="dropdown bg-primary my-1 ms-3 " style={{borderRadius:"25px" , maxHeight:"38px"}}>
                    <li>
                    <a
                        className="nav-link pointer dropdown-toggle text-light"
                        data-bs-toggle="dropdown"
                        style={{ marginBottom:"10px"}}
                    >
                        {/* <img className='me-2 pb-2' src="https://media.licdn.com/dms/image/C5603AQFM-wV_95HBPA/profile-displayphoto-shrink_100_100/0/1642605717330?e=1681344000&v=beta&t=HeRlv0VkzlI5bAmiTrUKocGPAni57-fzgTl-DkofSeE" alt="" style={{height:"35px", borderRadius:"50%"}}/> */}
                        
                        {auth?.user?.name?.toUpperCase()?.toUpperCase()}
                    </a>

                    <ul className="dropdown-menu">
                        <li>
                        <NavLink
                            className="nav-link"
                            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                        >
                            Dashboard
                        </NavLink>
                        </li>
                        <li>
                        <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin/profile" : "user/profile"
                            }`}> Profile </NavLink>
                        </li>
                            
                        <li className="nav-item pointer ">
                        <a onClick={logout} className="nav-link">
                            Logout
                        </a>
                        </li>
                    </ul>
                    </li>
                </div>
                )}
                </div>
            </ul>
        </div>
    );
};

export default Menu;