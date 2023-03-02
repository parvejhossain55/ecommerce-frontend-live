import { Modal } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../components/forms/CategoryForm';
import AdminMenu from '../../components/nav/AdminMenu';
import { Tooltip } from 'antd';

const Category = () => {

    const [name, setName] = useState();
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState("");

    useEffect(()=>{
        loadCategories();
    },[]);

    // Category Load
    const loadCategories = async () => {
        try{
            const { data } = await axios.get('/categories');
            setCategories(data);
            // console.log(data)
        }
        catch(error){
            console.log( error);
        }
    };

    // Category Create
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post("/category", {name});
            if(data?.error){
                toast.error(data.error);
            }
            else{
                loadCategories();
                setName("");
                toast.success(`"${data.name}" is Created`)
            }
        }
        catch(error){
            console.log("===",error);
            toast.error('Create Category Failed. Try again');
        }
    };

    // Category Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.put(`/category/${selected._id}`, {name: updatingName});
            if(data?.error){
                toast.error(data.error);
            }
            else{
                toast.success(`'${data.name}' updated successfully`);
                setSelected(null)
                setUpdatingName();
                setVisible(false);
                loadCategories();
            }
        }
        catch(error){
            console.log(error);
            toast.error('Update Category Failed. Try again');
        }
    };

    // Category Delete
    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.delete(`/category/${selected._id}`);
            if(data?.error){
                toast.error(data.error);
            }
            else{
                toast.success(`'${data.name}' Delete Success`)
                setSelected(null);
                setVisible(false);
                loadCategories();
            }
        }
        catch(error){
            console.log(error);
            toast.error('Delete Category Failed. Try again');
        }
    };
    
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 ">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>
                    
                
                    <div className='row d-flex justify-content-between'>
                        <div className="col-6 mt-3 ">
                            <div class="card">
                                <div class="card-header h4 ">
                                Category List
                                </div>
                                <div class="card-body">

                                    {categories?.map((c)=> (
                                        <Tooltip title="Update & Delete" color="purple">
                                        <button
                                            
                                            key={c._id}
                                            className="btn btn-outline-primary btn-sm my-3 me-4 "
                                            onClick={()=>{
                                                setVisible(true)
                                                setSelected(c)
                                                setUpdatingName(c.name)
                                            }}
                                            >
                                            {c.name} 
                                            
                                        </button>
                                        </Tooltip>
                                        
                                    ))}
                                </div>

                                <Modal
                                    visible={visible}
                                    onOk={()=>{setVisible(false)}}
                                    onCancel={()=>{setVisible(false)}}
                                    footer={null}
                                >
                                    <CategoryForm
                                        value={updatingName}
                                        setValue={setUpdatingName}
                                        handleSubmit={handleUpdate}
                                        buttonText="Update"
                                        handleDelete= {handleDelete}
                                    />
                                </Modal>
                            </div>
                        </div>

                        <div className="col-6 mt-3 ">
                            <div class="card">
                                <div class="card-header h4 ">
                                Category Create
                                </div>
                                <div class="card-body">
                                    <CategoryForm
                                        value={name}
                                        setValue={setName}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    

                </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
