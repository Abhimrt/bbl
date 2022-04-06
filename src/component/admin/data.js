import React, { useState } from 'react'

export default function Data() {
   const [pin, setPin] = useState("");
   const [pindata, setPindata] = useState([]);
   const detail = async () => {
     const response = await fetch(
       "https://api.postalpincode.in/pincode/" + pin
     );
     const data = await response.json();
     if (data[0].Status === "Success") setPindata(data[0].PostOffice);
   };
  return (
    <>
      <div className="box center">
        <input
          type="number"
          placeholder="Pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <label>Select your Area:</label>
        <select>
          {pindata.map((e) => {
            return (
              <>
                <option value="volvo">{e.Name}</option>
              </>
            );
          })}
        </select>
        <button onClick={detail}>Fetch </button>
        
      </div>
    </>
  );
}
