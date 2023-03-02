
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { useCart } from '../context/Cart';
import Jumbotron from "../components/cards/Jumbotron";
import ProductCartBody from '../components/cards/ProductCartBody';
import UserCartSidebar from '../components/cards/UserCartSidebar';
// import { RiDeleteBin6Line } from 'react-icons/ri';

const Cart = () => {

    const [auth, setAuth ] = useAuth();
    const [cart, setCart]=useCart();
    const navigate = useNavigate();

    const removeFromCart = (productId)=>{
        let myCart = [ ...cart ];
        let index = myCart.findIndex((item) => item?._id === productId);
        myCart.splice(index, 1);
        setCart(myCart)
        localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const cartTotal = ()=>{
        let total = 0;
        cart?.map((item)=>{
            let stock = item?.itemStock || 1;
            let price = stock * item?.price;
            total += price;
        });
        return total.toLocaleString("en-US",{style:"currency", currency:"USD"});
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

    return (
        <div>
            <Jumbotron
            title={`Hello ${auth?.token && auth?.user?.name}`}
            subtitle={cart?.length ? `You have ${cart?.length} items in the cart. ${auth?.token ? "" : "Please Login to Checkout"}` : "Your Cart is empty"}

            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="p-3 h4 mt-2 mb-2 bg-light text-center">
                            {cart?.length ? (" My Cart") : (
                                <div className="text-center">
                                    <button 
                                        onClick={()=> navigate("/")}
                                        className='btn btn-primary'>Continue Shopping</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {cart?.length && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row align-middle">
                                {cart?.map((p, i)=>(
                                    <ProductCartBody
                                        key={i}
                                        p={p}
                                        removeFromCart={removeFromCart}
                                        updateStock={updateStock}
                                        totalItemPrice={totalItemPrice}
                                 />
                                ))}
                                
                            </div>
                        </div>
                        <UserCartSidebar cartTotal={cartTotal} />
                    </div>
                </div>
            ) 
            }

        </div>
    );
};

export default Cart;