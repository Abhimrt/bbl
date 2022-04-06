import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const [truckid,setTruckid] = useState(""); 
    const [uniqueid,setUniqueid] = useState(""); 
    const truck =(e) =>{
        const E = e.toUpperCase();
        if(e.length<=10)
        setTruckid(E);
    }
    const unique =(e)=>{
        if (e.length <= 4) setUniqueid(e);
    }
    const done =()=>{
        if(uniqueid.length===4 && truckid.length===10){
            alert("Data Added")
            navigate("/admin");
        }else alert("Please enter valid Data")

    }
  return (
    <>
      <div className="box center">
        <div className="heading1">Add user</div>
        <input
          type="text"
          value={truckid}
          onChange={(e) => truck(e.target.value)}
          placeholder="Truck Id"
        />
        <input
          type="number"
          value={uniqueid}
          onChange={(e) => unique(e.target.value)}
          placeholder="Unique Id"
        />
        <button onClick={done}>Add</button>
      </div>
    </>
  );
}

export default Edit