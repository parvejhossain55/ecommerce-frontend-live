import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCartBody from '../../components/cards/ProductCartBody';
import UserMenu from '../../components/nav/UserMenu';
import moment from "moment";
import { useAuth } from '../../context/Auth';
import OrderBody from '../../components/cards/OrderBody';
import { useCart } from '../../context/Cart';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    
    const [auth, setAuth] = useAuth();
    const [cart, setCart]=useCart();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    
    const navigate = useNavigate();

    const removeFromCart = (productId)=>{
        let myCart = [ ...cart ];
        let index = myCart.findIndex((item) => item?._id === productId);
        myCart.splice(index, 1);
        setCart(myCart)
        localStorage.setItem("cart", JSON.stringify(myCart));
    }
    const totalItemPrice = (product)=> {
        let stock =product?.itemStock || 1;
        let totalPrice = stock * product?.price;
        
        return totalPrice?.toLocaleString("en-US", {style: "currency", currency:"USD"});
        
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

    const getOrders = async () => {
        try {
        const { data } = await axios.get("/orders");
        setOrders(data);
        } catch (err) {
        console.log(err);
        }
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
                        {orders?.map((o, i) => {
                            
                            return (
                                <div
                                key={o._id}
                                className="border shadow bg-light rounded-4 mb-5"
                                >
                                    
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Ordered</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{o?.status}</td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length} products</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        <div className="row m-2">
                                            {o?.products?.map((p, i) => (
                                                <ProductCartBody  key={i} p={p} remove={false} removeFromCart={removeFromCart} updateStock={updateStock} totalItemPrice={totalItemPrice} />
                                                //<OrderBody  key={i} p={p} remove={false} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
