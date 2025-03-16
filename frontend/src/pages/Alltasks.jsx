import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/InputData";
import axios from "axios";

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };   
     if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();

    }
  }, );

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.tasks}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        setUpdatedData={setUpdatedData}
        UpdatedData={UpdatedData}
      />
    </>
  );
};

export default AllTasks;
