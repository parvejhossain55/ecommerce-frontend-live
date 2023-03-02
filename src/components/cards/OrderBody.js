import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuth } from '../../context/Auth';
import { useCart } from '../../context/Cart';


const OrderBody = ({ i, p , remove = true}) => {

  const [cart, setCart]=useCart();

  const totalItemPrice = (product)=> {
    let stock =product?.itemStock || 1;
    let totalPrice = stock * product?.price;
    
    return totalPrice?.toLocaleString("en-US", {style: "currency", currency:"USD"});
    
}

const removeFromCart = (productId)=>{
    let myCart = [ ...cart ];
    let index = myCart.findIndex((item) => item?._id === productId);
    myCart.splice(index, 1);
    setCart(myCart)
    localStorage.setItem("cart", JSON.stringify(myCart));
}

function updateStock (stock, productId){
    let myCart = [ ...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    if (index !== -1) {
        let product = myCart[index];
        product.itemStock = parseInt(stock);
        myCart.splice(index, 1 , product);

        setCart([...myCart]);
        localStorage.setItem("cart",JSON.stringify([...myCart]));
    }
}

    return (
        <>
            <div className="card mb-3" key={i}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            key={p._id}
                            className='rounded-start'
                            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                            alt={p.name}
                            style={{
                                height: "150px",
                                width: "250px",
                                objectFit: "cover",
                                marginLeft: "-12px",
                            }}
                        />
                    </div>
                    <div className="col-md-8 mt-4">
                        <h5 className="card-title">{p.name}</h5>
                        <div className="d-flex justify-content-between mt-5 me-5">
                            <p className="card-text">Unit Price :</p>
                            {p?.price?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            
                            <p className="card-text">Quantity</p>
                            <p>
                                <input
                                    readOnly={true}
                                    type="number"
                                    className="form-control"
                                    style={{
                                        width: "50px",
                                    }}
                                />
                            </p>
                            <p className="card-text">Total Price :</p>
                            <p>{totalItemPrice(p)}</p>
                            {remove && (
                            <RiDeleteBin6Line
                                className="text-danger mb-2 pointer "
                                onClick={removeFromCart.bind( this, p._id )}
                            />
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderBody;
