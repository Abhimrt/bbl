import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
     const navigate = useNavigate();
     const [pin,setPin]=useState("");
     const [pindata,setPindata]=useState([]);
     const detail= async ()=>{
        const response = await fetch("https://api.postalpincode.in/pincode/"+pin)
        const data = await response.json()
        if (data[0].Status === "Success")
          setPindata(data[0].PostOffice);
        else alert("Enter valid Pincode")
     }
   



     
  return (
    <>
      <div className="box center">
        <div className="heading1">Sign in</div>
        <input type="number" placeholder="Mobile number" min="1" max="51" />
        <input type="text" placeholder="Name" />
        <input
          type="number"
          placeholder="Pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button className="btn btn-success" onClick={detail}>
          Fetch
        </button>
        <label>Select your Area:</label>
        <select>
          {pindata.map((e) => {
            return (
              <>
                <option>{e.Name}</option>
              </>
            );
          })}
        </select>
        <input type="password" placeholder="Password" />
        <button>Signin </button>
        <p onClick={() => navigate("/user")} className="link">
          Already have an account | click here |
        </p>
      </div>
    </>
  );
}
