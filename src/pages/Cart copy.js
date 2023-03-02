
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
    const [cart, setCart]=useCart()
    const navigate = useNavigate();

    // const removeFromCart = (productId)=>{
    //     let myCart = [ ...cart ];
    //     let index = myCart.findIndex((item) => item?._id === productId);
    //     myCart.splice(index, 1);
    //     setCart(myCart)
    //     localStorage.setItem("cart", JSON.stringify(myCart));
    // }

    // const cartTotal = ()=>{
    //     let total = 0;
    //     cart?.map((item)=>{
    //         let stock = item?.itemStock || 1;
    //         let price = stock * item?.price;
    //         total += price;
            
    //         // total += item?.price;
    //     });
    //     return total.toLocaleString("en-US",{style:"currency", currency:"USD"});
    // }

    // const totalItemPrice = (product)=> {
    //     let stock =product?.itemStock || 1;
    //     let totalPrice = stock * product?.price;
        
    //     return totalPrice?.toLocaleString("en-US", {style: "currency", currency:"USD"});
        
    // }

    // function updateStock (stock, productId){
    //     let myCart = [ ...cart];
    //     let index = myCart.findIndex((item) => item._id === productId);
    //     if (index !== -1) {
    //         let product = myCart[index];
    //         product.itemStock = parseInt(stock);
    //         myCart.splice(index, 1 , product);

    //         setCart([...myCart]);
    //         localStorage.setItem("cart",JSON.stringify([...myCart]));
    //     }
    // }

    return (
        <div>
            <Jumbotron
            title={`Hello ${auth?.token && auth?.user?.name}`}
            subtitle={cart?.length ? `You have ${cart?.length} items in the cart. ${auth?.token ? "" : "Please Login to Checkout"}` : "Your Cart is empty"}

            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="p-3 mt-2 mb-2 bg-light text-center">
                            {cart?.length ? (" My Cart") : (
                                <div className="text-center">
                                    <button 
                                        onClick={()=> navigate("/")}
                                        className='btn btn-primary'>Continue Shopping</button>
                                </div>
                            )}
                        </h4>
                    </div>
                </div>
            </div>

            {cart?.length && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                 <div className="card">
                                    <table class="table align-middle">
                                        <thead>
                                            <tr>
                                            <th scope="col">No</th>
                                            <th scope="col"></th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                    {cart?.map((p, i)=>(
                                        <tbody>
                                            <ProductCartBody key={i} p={p} />
                                           {/* <tr>
                                            <th scope="row">{i}</th>
                                            <td>
                                                <img className='col-md-4' src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`} alt={p?.name} style={{width:"50px" , height:"50px" , objectFit:"cover", borderRadius:"10px"}} />
                                                
                                            </td>
                                            <td><p className=''>{p.name}</p></td>
                                            <td>{p?.price?.toLocaleString("en-us", {style: "currency", currency:"USD"})}</td>
                                            <td><input 
                                                className=' form-control' 
                                                style={{width:"90px"}} 
                                                type="number" 
                                                defaultValue={p?.itemStock ? p?.itemStock : 1}
                                                min="1"
                                                max="10"
                                                onChange={(e)=> updateStock(e.target.value, p._id)}

                                                 /></td>
                                            <td>{totalItemPrice(p)}</td>
                                            <td className='text-danger text-center'><RiDeleteBin6Line onClick={()=> removeFromCart(p._id)} className=' pointer'/></td>
                                            </tr> */}
                                        </tbody>
                                    ))}
                                    </table>
                                </div>
                            </div>
                        </div>

                        <UserCartSidebar/>

                        {/* <div className="col-md-4">
                            <h4>Your Cart Summary</h4>
                            Total / Address / Payments <hr />
                            <h6>SubTotal: {cartTotal()}</h6>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Address</h4>
                                        <h5>{auth?.user?.address}</h5>
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
                        </div> */}

                    </div>
                </div>
            ) 
            }

        </div>
    );
};

export default Cart;