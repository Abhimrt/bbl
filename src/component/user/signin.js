import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import link from "../../link/user";

export default function Signin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [pindata, setPindata] = useState([]);
  const Mob = (e) => {
    if (e.length <= 10) setPhone(e);
  };
  const PIN = (e) => {
    if (e.length <= 6) setPin(e);
  };
  const detail = async () => {
    const response = await fetch("https://api.postalpincode.in/pincode/" + pin);
    const data = await response.json();
    if (data[0].Status === "Success") setPindata(data[0].PostOffice);
    else alert("Enter valid Pincode");
  };

  function done() {
    if (
      phone.length === 10 &&
      password.length >= 8 &&
      name.length >= 2 &&
      pin.length === 6 &&
      zone.length >=1
    ) {
      let a = link.create({
        name: name,
        phone: phone,
        password: password,
        pincode: pin,
        zone: zone,
      });
      console.log("dsf"+a.success);
    } else {
      alert("Enter Valid details");
    }
  }

  return (
    <>
      <div className="box center">
        <div className="heading1">Sign in</div>
        <input
          type="number"
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => Mob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pincode"
          value={pin}
          onChange={(e) => PIN(e.target.value)}
        />
        <button className="btn btn-success" onClick={detail}>
          Fetch
        </button>
        <label>Select your Area:</label>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          {pindata.map((e) => {
            return (
              <>
                <option>{e.Name}</option>
              </>
            );
          })}
        </select>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={done}>Signin </button>
        <p onClick={() => navigate("/user")} className="link">
          Already have an account | click here |
        </p>
      </div>
    </>
  );
}
