import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import ProductCard from '../components/cards/ProductCard';
import { useSearch } from '../context/Search';

const SearchPage = () => {

    const [values, setValues] = useSearch();

    return (
        <div>
            <Jumbotron 
            title=" Your Search Result" 
            subtitle={values?.results?.length < 1 ? "No Products Found" : `Found ${values?.results?.length} products`} 
            />

            <div className="container mt-3">
                <div className="row">
                    {values?.results?.map((p) => (
                        <div key={p._id} className="col-md-3 col-sm-6">
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default SearchPage;






// import { useSearch } from '../context/Search';
// import ProductCard from "../components/cards/ProductCard";
// import Jumbotron from "../components/cards/Jumbotron";

// const SearchPage=()=> {
//   const [values, setValues] = useSearch();

//   return (
//     <>
//       <Jumbotron
//         title="Search results"
//         subTitle={
//           values?.results?.length < 1
//             ? "No products found"
//             : `Found ${values?.results?.length} products`
//         }
//       />

//       <div className="container mt-3">
//         <div className="row">
//           {values?.results?.map((p) => (
//             <div key={p._id} className="col-md-4">
//               <ProductCard p={p} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default SearchPage