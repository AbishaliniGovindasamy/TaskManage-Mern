import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData = { id: "", title: "", desc: "" }, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    if (UpdatedData?.title || UpdatedData?.desc) {
      setData({ title: UpdatedData.title, desc: UpdatedData.desc });
    }
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      if (UpdatedData?.id) {
        // If the task is being updated
        await axios.put(`http://localhost:1000/api/v2/update-task/${UpdatedData.id}`, Data, { headers });
        alert("Task updated successfully!");
        setUpdatedData({ id: "", title: "", desc: "" }); // Reset updated data
      } else {
        // If it's a new task
        await axios.post(`http://localhost:1000/api/v2/create-task`, Data, { headers });
        alert("Task created successfully!");
      }
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full fixed z-10`}></div>
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full fixed z-20`}>
        <div className="w-3/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              className="text-2xl"
              onClick={() => {
                setInputDiv("hidden");
                setData({ title: "", desc: "" });
                setUpdatedData({ id: "", title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Description.."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {UpdatedData?.id ? (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={submitData}
            >
              Update
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
