import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";

const CategoryView = () => {
    // state
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    // hooks
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProductsByCategory();
      }, [params?.slug]);

    const loadProductsByCategory = async () => {
        try {
          const { data } = await axios.get(`/products-by-category/${params.slug}`);
          setCategory(data.category);
          setProducts(data.products);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div>
            <Jumbotron title={category?.name} subtitle={`${products?.length}  products found in "${category?.name}"`}
            />
            <div className="container my-4">
                <div className="row">
                    {products?.map((p)=>(
                        <div className="col-md-3" key={p._id}>
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryView;