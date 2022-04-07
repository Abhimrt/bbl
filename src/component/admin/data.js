import React, { useState } from 'react'

export default function Data() {
  const [zone, setZone] = useState("");
   const [pin, setPin] = useState("");
   const [pindata, setPindata] = useState([]);

    const PIN = (e) => {
      if (e.length <= 6) setPin(e);
      if (e.length === 6) detail(e);
      else {
        setPindata([]);
        setZone("");
      }
    };
    const detail = async (e) => {
      const response = await fetch("https://api.postalpincode.in/pincode/" + e);
      const data = await response.json();
      if (data[0].Status === "Success") {
        setPindata(data[0].PostOffice);
      } else {
        setZone("");
        setPindata([]);
        alert("Enter valid Pincode");
      }
    };
  return (
    <>
      <div className="box center">
        <input
          type="number"
          placeholder="Pincode"
          value={pin}
          onChange={(e) => PIN(e.target.value)}
        />
        <label>Select your Area:</label>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          {pindata.map((e,i) => {
            return <option key={i}>{e.Name}</option>;
          })}
        </select>
        <button >Fetch </button>
      </div>
    </>
  );
}
