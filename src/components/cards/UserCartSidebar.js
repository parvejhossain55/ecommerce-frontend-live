import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { useCart } from '../../context/Cart';

const UserCartSidebar = ({ cartTotal }) => {

    const [auth, setAuth ] = useAuth();
    const [cart, setCart]=useCart();
    const navigate = useNavigate();

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(auth?.token){
            getClientToken();
        }
    },[auth?.token]);

    // Client Payment Token
    const getClientToken = async () => {
        try {
          const { data } = await axios.get("/braintree/token");
        //   console.log("------>--->",data)
          setClientToken(data.clientToken);
        } catch (err) {
          console.log(err);
        }
    };
    
    // Handle Buy
    const handleBuy = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          //   console.log("nonce => ", nonce);
          const { data } = await axios.post("/braintree/payment", {
            nonce,
            cart,
          });
            console.log("handle buy response => ", data);
          setLoading(false);
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/dashboard/user/orders");
          toast.success("Payment successful");
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

    return (
        <div className="col-md-3 mb-5">
            <h4>Your Cart Summary</h4>
            Total / Address / Payments <hr />
            <h6>SubTotal: {cartTotal()}</h6>
            {auth?.user?.address ? (
                <>
                    <div className="mb-3">
                        <h4>Address</h4>
                        <h6>{auth?.user?.address}</h6>
                    </div>
                    <button onClick={()=> navigate("/dashboard/user/profile")} className='btn btn-outline-primary btn-sm'>Update Address</button>
                </>
            ) : (
                <div className="mb-3">
                    {auth?.token ? (
                        <button onClick={()=> navigate("/dashboard/user/profile")} className="btn btn-outline-dark btn-sm mt-2"> Add Delivery Address </button>
                    ) : (
                        <button onClick={()=> navigate("/login", {state: "/cart",})} className='btn btn-outline-danger btn-sm' >Login to Checkout</button>
                    )}
                </div>
            )}
            <div className="mt-3">
                {!clientToken || !cart?.length ? ( "" ) : (
                    <>
                        <DropIn
                            options={{
                                authorization: clientToken,
                                paypal: { flow: 'vault'}
                            }}
                            onInstance={(instance)=>{ setInstance(instance)}}
                        />
                        <button
                            onClick={handleBuy}
                            className="btn btn-primary col-12 mt-2"
                            disabled={!auth?.user?.address || !instance || loading}
                        >
                            {loading ? "Processing..." : "Buy"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCartSidebar;