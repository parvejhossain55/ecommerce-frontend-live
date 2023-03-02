import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCart } from '../../context/Cart';

const ProductCartBody = ({ updateStock, totalItemPrice, removeFromCart, i, p , remove = true}) => {

    const [cart, setCart]=useCart()

    return (
        <>
            {/* {cart?.map((p, i) => ( */}
                <div className="card mb-3" key={i}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                className='rounded-start'
                                src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                                alt={p.name}
                                style={{
                                    height: "175px",
                                    width: "250px",
                                    objectFit: "cover",
                                    marginLeft: "-12px",
                                    borderRopRightRadius: "0px",
                                }}
                            />
                        </div>
                        <div className="col-md-8 mt-3">
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text">Price :</p>
                                    {p?.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                    <p className="card-text">Total Price :</p>
                                    <p>{totalItemPrice(p)}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text">Quantity</p>
                                    <p>
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{
                                                width: "100px",
                                            }}
                                            defaultValue={
                                                p?.itemStock
                                                    ? p?.itemStock
                                                    : 1
                                            }
                                            min="1"
                                            max="12"
                                            onChange={(e) =>
                                                updateStock(
                                                    e.target.value,
                                                    p._id
                                                )
                                            }
                                        />
                                    </p>
                                    {remove && (
                                        <RiDeleteBin6Line
                                            className="text-danger mb-2 pointer "
                                            onClick={removeFromCart.bind(
                                            this,
                                            p._id
                                        )}
                                    />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* ))} */}
        </>
    );
};

export default ProductCartBody;
