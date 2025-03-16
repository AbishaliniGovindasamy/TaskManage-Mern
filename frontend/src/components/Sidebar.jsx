import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const data = [
    { title: "All tasks", icon: <CgNotes />, Link: "/" },
    { title: "Important tasks", icon: <MdLabelImportant />, Link: "/importanttasks" },
    { title: "Completed tasks", icon: <FaCheckDouble />, Link: "/completedtasks" },
    { title: "Incomplete tasks", icon: <TbNotebookOff />, Link: "/incompletetasks" },
  ];

  const [Data, setData] = useState(null); 

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };
 

  useEffect(() => {
    const fetch = async () => {
      

      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", 
       { headers,
        
        });
        
        setData(response.data.data);
      } 
      
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();

    }  }, );

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username || 'Username not available'}</h2>
          <h4 className="my-1 text-gray-400">{Data.email || 'Email not available'}</h4>
          <hr className="my-2" />
        </div>
      )}

      <div>
        {data.map((items, i) => (
          <Link
            to={items.Link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300"
          >
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          LogOut
        </button>
      </div>
    </>
  );
};

export default Sidebar;