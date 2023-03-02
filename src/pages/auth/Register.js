import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // let photo = 'https://i.ibb.co/4pDNDk1/avatar.png'
  // my hook
  const [auth, setAuth] = useAuth();
  //hook

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post(`/register`, { name, email, password });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, user: data.user, token: data.token });
        toast.success(" Registration Successful");
        navigate("/dashboard/user");
      }
    } catch (error) {
      console.log(error);
      toast.error(" Registration Faild. Try again.");
    }
  };

  return (
    <div className="">
      <div className="my-5 d-flex justify-content-center align-items-center ">
        <div className="col-md-5 p-4 shadow-sm border rounded-5 border-primary bg-light">
          <h2 className="text-center mb-4 text-primary">Register Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <label for="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control border border-primary"
                placeholder="Enter your name"
                id="exampleInputName"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control border border-primary"
                placeholder="Enter your email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control border border-primary"
                placeholder="Enter your password"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
