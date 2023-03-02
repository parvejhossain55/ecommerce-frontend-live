import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

const ProductView = () => {

    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [cart, setCart] = useCart();

    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async (req, res) => {
        try {
          const { data } = await axios.get(`/product/${params.slug}`);
          setProduct(data);
          loadRelated(data._id, data.category._id);
        } catch (err) {
          console.log(err);
        }
      };

      const loadRelated = async (productId, categoryId) => {
        try {
          const { data } = await axios.get(
            `/related-products/${productId}/${categoryId}`
          );
          setRelated(data);
        } catch (err) {
          console.log(err);
        }
      };


      function addToCart (product){
        if(cart?.length >= 1){
            let checkExit = cart.some((item)=> item?._id === product);
            if(!checkExit){
                setCart([ ...cart, product]);
                localStorage.setItem("cart", JSON.stringify([ ...cart, product]));
                toast.success("product Added to Cart");
            }
            else{
                toast.error("Product Already added");
            }
        }
        else{
            setCart([...cart, product]);
            localStorage.setItem("cart", JSON.stringify([ ...cart, product]));
            toast.success("product Added to Cart");
        }
    }


    return (
        <div>
            <div className="container">
                <div className="card  bg-light mt-5">
                    <div className="row p-4">
                        <div className="col-md-5">
                            <div className="">
                                <img className="rounded" src={`${process.env.REACT_APP_API}/product/photo/${product._id}`} alt={product.name} style={{width:"100%"}}/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <h3>{product?.name}</h3>
                            <hr />
                            <div className="d-flex w-50 my-3">
                                <button className="btn bg-white me-2">{`${product?.stock >= 1 ? `${product?.stock - product?.sold} in stock` : "Out of stock" }`}</button>
                                <button className="btn bg-white">{`${product?.sold} sold`}</button>
                            </div>
                            <p className="fw-bold fs-5">
                            Price:{" "}
                            {product?.price?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            </p>
                            <button className="btn btn-primary me-2">Buy Now</button>
                            <button 
                                // onClick={()=>{
                                //     setCart([ ...cart, product]);
                                //     localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                //     toast.success("Added to cart");
                                // }} 
                                // onClick={addToCart.bind(this, p)}
                                onClick={addToCart.bind(this, product?._id)}
                                className="btn btn-outline-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>


                <div className="card bg-light mt-5">
                    <div className="row p-3">
                        <div className="col-md-8">
                            <h4 className="">Product Description</h4><hr />
                            <p className="card-text lead">{product?.description}</p>
                        </div>
                        <div className="col-md-4">
                            <h4 className="">Product Details</h4><hr />
                            <div>
                                <p>
                                <FaDollarSign /> Price:{" "}
                                {product?.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                                </p>

                                <p>
                                <FaProjectDiagram /> Category: {product?.category?.name}
                                </p>

                                <p>
                                <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                                </p>

                                <p>
                                {product?.stock > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                                <p>
                                <FaWarehouse /> Available {product?.stock - product?.sold}
                                </p>

                                <p>
                                <FaRocket /> Sold {product.sold}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <h2>Related Products</h2>
                    <hr />
                    {related?.length < 1 && <p>Nothing Found</p>}
                    {related?.map((p)=>(
                        <div className="col-md-3">
                            <ProductCard p={p} key={p._id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductView;