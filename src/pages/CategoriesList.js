import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from "../components/cards/Jumbotron";
import useCategory from '../components/hooks/useCategory';

const CategoriesList = () => {
    const categories = useCategory();
    return (
        <div>
            <Jumbotron title="Categories" subtitle="List of all categories" />
            <div className="container overflow-hidden">
                <div className="row gx-5 gy-5 mt-3 mb-5">
                    {categories?.map((c)=>(
                        <div className="col-md-3" key={c._id}>
                            <button className='btn btn-light col-12 text-dark p-3'>
                                <Link to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesList;