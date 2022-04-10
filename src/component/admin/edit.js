import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import link from "../../link/driver";

const Edit = () => {
  const navigate = useNavigate();
  const [truckid, setTruckid] = useState("");
  const [uniqueid, setUniqueid] = useState("");
  const [reuniqueid, setReuniqueid] = useState("");
  const [zone, setZone] = useState("");
  const [pin, setPin] = useState("");
  const [pindata, setPindata] = useState([]);
  // Truck id ==================================
  const truck = (e) => {
    const E = e.toUpperCase();
    if (e.length <= 10) setTruckid(E);
  };
  // id  ====================================
  function ID(e) {
    if (e.length <= 6) setUniqueid(e);
  }
  // reenter password =======================
  function id(e) {
    if (
      (uniqueid.length === e.length && uniqueid !== e) ||
      uniqueid.length < e.length
    ) {
      alert("password was to be same");
      setReuniqueid("");
      setUniqueid("");
    } else setReuniqueid(e);
  }

  // pin and zone =============================
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
  }; //pin over

  //velidation and sending data ====================
  const done = async () => {
    if (uniqueid.length === 6 && truckid.length === 10 && pin && zone) {
      let a = await link.Create({
        password: uniqueid,
        truckID: truckid,
        zone: zone.toUpperCase(),
        pincode: pin,
      });
      if (a) navigate("/admin/logedin");
    } else alert("Please enter all Data");
  };
  //logout ==========================
  function logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div className="logout center" onClick={logout}>
        logout
      </div>
      <div className="box center">
        <div className="heading1">Add Driver</div>
        <input
          type="text"
          value={truckid}
          onChange={(e) => truck(e.target.value)}
          placeholder="Truck Id"
        />
        <input
          type="password"
          value={uniqueid}
          onChange={(e) => ID(e.target.value)}
          placeholder="Unique Id"
        />
        <input
          type="password"
          value={reuniqueid}
          onChange={(e) => id(e.target.value)}
          placeholder="Re-enter Unique Id"
        />
        <input
          type="number"
          placeholder="Pincode"
          value={pin}
          onChange={(e) => PIN(e.target.value)}
        />
        <label>Select your Area:</label>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          {pindata.map((e, i) => {
            return <option key={i}>{e.Name}</option>;
          })}
        </select>
        <button onClick={done}>Add</button>
      </div>
    </>
  );
};

export default Edit;
