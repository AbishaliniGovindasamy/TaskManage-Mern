import React,{useEffect ,useState}from 'react';
import Cards from '../components/Cards';
import axios from 'axios';

const Incompletetasks = () => {
  const [Data, setData] = useState();
    useEffect(() => {
    const fetch = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-incomplete-tasks", { headers });
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, );
  console.log(Data);

  return (
    <div>
      <Cards home={"false"} data={Data}/>
      </div>
  )
};

export default Incompletetasks;