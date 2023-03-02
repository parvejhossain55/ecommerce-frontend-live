import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Index from '../components/cards/Demo';
import Jumbotron from '../components/cards/Jumbotron';
import ProductCard from '../components/cards/ProductCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

import "./home.css";
import useCategory from '../components/hooks/useCategory';

const HomePage = () => {
    const [auth, setAuth ] = useAuth()
    const [products, setProducts] = useState([]);

    const [listProducts, setListProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const categories = useCategory();
    useEffect(()=>{
        loadProducts();
        loadListProducts();
        getTotal();
    },[])

    //Load more
    useEffect(() => {
        if (page === 1) return;
        loadMore();
      }, [page]);

      // Get Total
      const getTotal = async () => {
        try {
          const { data } = await axios.get("/products-count");
          setTotal(data);
        } catch (err) {
          console.log(err);
        }
      };

    //All Products
    const loadProducts = async () => {
        try{
            const { data } = await axios.get('/products');
            setProducts(data);
        }
        catch(error){
            console.log(error);
        }
    }

    // List Products per page
    const loadListProducts = async () => {
        try{
            const { data } = await axios.get(`/list-products/${page}`);
            setListProducts(data);
        }
        catch(error){
            console.log(error);
        }
    }

    // Load more
    const loadMore = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/list-products/${page}`);
          setListProducts([...listProducts, ...data]);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

// Carousel
    let newP = document.querySelector('.new-product');
    let sell = document.querySelector('.bestSellProduct');

    const btnprev = () => {
        let width = newP.clientWidth;
        newP.scrollLeft = newP.scrollLeft - width;
        console.log(width)
    }

    const btnnext = () => {
        let width = newP.clientWidth;
        newP.scrollLeft = newP.scrollLeft + width;
        console.log(width)
    }

    const sellbtnprev = () => {
        let width = sell.clientWidth;
        sell.scrollLeft = sell.scrollLeft - width;
        console.log(width)
    }

    const sellbtnnext = () => {
        let width = sell.clientWidth;
        sell.scrollLeft = sell.scrollLeft + width;
        console.log(width)
    }

    //Best selling products
    const arr = [...products];
    const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));


    return (
        <div className=''>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header fw-bold">Categories</div>
                            <div className="card-body overflow-auto" style={{maxHeight:"290px"}}>
                            {categories?.map((c) => (
                                // <li key={c._id} className=" nav-item">
                                <NavLink className="nav-link active" to={`/category/${c.slug}`}>
                                    <p className='text-dark'>{c.name}</p>
                                </NavLink>
                                // </li>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="2000">
                            <img src="https://takesell.com.bd/public/uploads/all/64EvjvsKlThaX0q8aAfuWQqcathPQFjSAk54ymTz.png" class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img src="https://takesell.com.bd/public/uploads/all/KrrXDmK45sUtau4v36ITtgvPe7uyVKGnCTJYRb8B.png" class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Jumbotron title="Home Page" /> */}
            {/* <pre>{JSON.stringify(auth , null, 4)}</pre> */}

            <section >
                <div className="product-carousel container mx-auto">
                    <h3 className="mt-4 mx-3 px-2 bg-light"> New Arrivals </h3>

                    <button className="pre-btn" onClick={btnprev}><i className="fa-solid fa-chevron-left bg-dark text-light fs-1 py-1 px-2 rounded"></i></button>
                    <button className="next-btn" onClick={btnnext}><i className="fa-solid fa-chevron-right bg-dark text-light fs-1 py-1 px-2 rounded"></i></button>

                    <div className="new-product pb-5 ">
                        {products?.map((p)=>(
                            <div key={p._id} className="col-md-3 ">
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section>
                <div className="product-carousel  container mx-auto ">
                    <h3 className=" mx-3 px-3 bg-light"> Best Selling </h3>

                    <button className="pre-btn" onClick={sellbtnprev}><i className="fa-solid fa-chevron-left bg-dark text-light fs-1 py-1 px-2 rounded"></i></button>
                    <button className="next-btn" onClick={sellbtnnext}><i className="fa-solid fa-chevron-right bg-dark text-light fs-1 py-1 px-2 rounded"></i></button>

                    <div className="bestSellProduct pb-5">
                        {sortedBySold?.map((p)=>(
                            <div key={p._id} className="col-md-3">
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className=' container mx-auto'>
                <h3 className="px-2 bg-light"> All Products </h3>
                <div className="row pb-5 ">
                        {listProducts?.map((p)=>(
                            <div key={p._id} className="col-md-3">
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
            </section>

            <div className="container text-center ">
            
                {listProducts && listProducts.length < total && (
                <div className='divider'>
                <div class="dividermask"></div> 
                <button
                    className="btn btn-light btn-lg col-md-6 pt-1 text-center"
                    disabled={loading}
                    onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    }}
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
                </div>
                )}
            </div>

        </div>
    );
};

export default HomePage;