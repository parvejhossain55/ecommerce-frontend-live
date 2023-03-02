import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loading = ({ path = "login" })=> {
  // state
  const [count, setCount] = useState(2);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div class="text-center">
        <div class="spinner-border text-primary p-3" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;


//    ||  
// import React from 'react';

// const Loading = () => {
//     return (
//         <div className=''>
//             <div class="text-center m-5">
//                 <div class="spinner-border text-primary p-3" role="status">
//                     <span class="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Loading;