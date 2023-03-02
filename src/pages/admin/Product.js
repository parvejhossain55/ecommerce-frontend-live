import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../components/nav/AdminMenu';
// import { Button, Result } from 'antd';



const Product = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [shipping, setShipping] = useState("");
    const [stock, setStock] = useState("");

    const navigate = useNavigate();
    

    useEffect(()=>{
        loadCategories();
    },[]);

    // Category Load
    const loadCategories =async () =>{
        try{
            const { data } = await axios.get('/categories');
            setCategories(data);
        }
        catch(error){
            console.log(error);
        }
    }
    

    // Product Submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("stock", stock);

            const { data } = await axios.post('/product', productData);
            if(data?.error){
                console.log('product--->',data)
                toast.error(data.error);
            }
            else{
                toast.success(`'${data.name}' is created successfully`);
                navigate('/dashboard/admin/products');
                
            }
        }
        catch(error){
            console.log(error);
            toast.error('Product create failed. try again later');
        }
    };


    


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>
                    
                    <div className='w-50 mx-auto'>
                        {/*  Photo Show */}
                        {photo && (
                            <div className='text-center'>
                                <img 
                                    src={URL.createObjectURL(photo)} 
                                    alt="Product Photo"
                                    className="img img-responsive rounded "
                                    height="150px"
                                />
                                    
                            </div>
                        )}
                        
                        {/* Photo Upload */}
                        <div className='pt-2'>
                            <label className='btn btn-primary col-12 mb-3'>

                                {photo ? photo.name : "Upload photo"}
                                
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e)=> setPhoto(e.target.files[0])}
                                    hidden
                                ></input>
                            </label>
                        </div>

                            {/* Product Name */}
                        <input
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Write a name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Product Description */}    
                        <textarea
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Write a description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Product Price */}
                        <input
                            type="number"
                            min="0"
                            className="form-control p-2 mb-3"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        
                        {/* Product Category */}
                        {/* <Select
                            showSearch
                            bordered={false}
                            size="small"
                            className='form-select mb-3'
                            placeholder='Choose Category'
                            onChange={(value) => setCategory(value)}
                            filterOption={true}
                        >

                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select> */}
                        <Select
                            showSearch
                            bordered={false}
                            size="small"
                            className='form-select mb-3'
                            placeholder='Choose Category'
                            onChange={(value) => setCategory(value)}
                            dataSource={Option}
                            filterOption={(inputValue, Option) => Option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        >

                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        {/* Product Shipping? */}
                        <Select
                            bordered={false}
                            size="small"
                            className="form-select mb-3"
                            placeholder="Choose shipping"
                            onChange={(value) => setShipping(value)}
                            
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>

                        {/* Product Quantity */}
                        <input
                            type="number"
                            min="1"
                            className="form-control p-2 mb-3"
                            placeholder="Enter Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        {/* Submit */}
                        <button onClick={handleSubmit} className="btn btn-primary mb-5 w-100">
                            Submit
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Product;