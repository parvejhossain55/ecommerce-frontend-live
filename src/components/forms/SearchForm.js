import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/Search';



const SearchForm = () => {

    const [values, setValues ] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.get(`/products/search/${values?.keyword}`);
            //console.log( "---->",data);
            setValues({ ...values, results: data });
            //console.log(values.results);
            navigate('/search')
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <form className="d-flex m-1" onSubmit={handleSubmit}>
                <input
                    type="search"
                    style={{ borderRadius: "8px 0 0 8px" }}
                    className="form-control bg-light"
                    placeholder="Search"
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    value={values.keyword}
                />
                <button
                    className="btn btn-outline-primary"
                    type="submit"
                    style={{ borderRadius: "0 8px 8px 0" }}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchForm;