import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from "../store/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate(); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history("/");
  }

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
      const response = await axios.post(
  `${process.env.REACT_APP_API_BASE_URL}/api/v1/log-in`,
  Data
);

        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='h-[90vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>Login</div>
        <input
          type='text'
          placeholder='username'
          className='bg-gray-700 px-3 my-3 w-full rounded'
          name='username'
          value={Data.username}
          onChange={change}
        />
        <input
          type='password'
          placeholder='password'
          className='bg-gray-700 px-3 my-3 w-full rounded'
          name='password'
          value={Data.password}
          onChange={change}
        />
        <div className='w-full flex items-center justify-between'>
          <button
            className='bg-blue-400 text-xl font-semibold text-black px-3 py-1 rounded'
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className='text-gray-400 hover:text-gray-200'>
            Not having an account? Please SignUp here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
