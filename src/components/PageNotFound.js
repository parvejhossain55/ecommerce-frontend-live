import React from 'react';
import image from '../assets/image/page-not-found.svg'

const PageNotFound = () => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                {/* <h1 className="text-danger">404 | Page not found</h1> */}
                <img className='w-25 mx-auto d-block mt-5' src={image} alt=""/>
            </div>
        </div>
    );
};

export default PageNotFound;