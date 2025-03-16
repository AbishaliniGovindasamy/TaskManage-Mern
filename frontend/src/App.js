import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTasks from "./pages/Alltasks";
import Importanttasks from "./pages/Importanttasks";
import Completedtasks from "./pages/Completedtasks";
import Incompletetasks from "./pages/Incompletetasks";
import { Routes, Route, useNavigate } from "react-router-dom";
import { authActions } from "./store/auth";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useSelector,useDispatch } from "react-redux";




const App= () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
    navigate("/signup");
  }
}, []);
  

  return(
  <div className="bg-gray-900 text-white h-screen p-2 relative">
    
    <Routes>
  <Route exact path="/" element={<Home />}>
    <Route index element={<AllTasks />} />
    <Route path="importanttasks" element={<Importanttasks />} />
    <Route path="completedtasks" element={<Completedtasks />} />
    <Route path="incompletetasks" element={<Incompletetasks />} />
  </Route>
  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login />} />
</Routes>

    </div>
  );
};
export default App;