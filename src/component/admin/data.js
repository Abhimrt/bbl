import React, { useEffect, useState } from 'react'
import link from "../../link/search"
import { useNavigate } from "react-router-dom";

export default function Data() {
  const navigate =  useNavigate();
  const [zone, setZone] = useState("");
  const [pin, setPin] = useState("");
  const [pindata, setPindata] = useState([]);
  const [userreq, setUserreq] = useState([]);
  const [user, setUser] = useState([]);
  const [driver, setDriver] = useState([]);

  useEffect(async () => {
    // user =================
    if (zone) {
      let a = await link.User({
        pincode: pin,
        zone: zone,
      });
      setUser(a.allRequest);
    }
    // driver ==================
    if (zone) {
      let a = await link.Driver({
        pincode: pin,
        zone: zone,
      });
      setDriver(a.Request);
    }
    // requests ===============
    if (zone) {
      let a = await link.Request({
        pincode: pin,
        zone: zone,
      });
      setUserreq(a.Request);
      console.log(a);
    }
  }, [zone]);

  //pin code api===================
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
        <a href="#data">
          <button>Fetch </button>
        </a>
      </div>
      {/* request details */}
      <div className="heading1 mt-5">User's</div>
      <table
        className="table table-success table-striped mt-3 mb-5"
        style={{ width: "80%" }}
      >
        <thead id="data">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {user.length !== 0 ? (
            user.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.phone} </td>
                  <td>
                    {e.latitude} {e.longitude}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* user details */}
      <div className="heading1 mt-5">Request</div>
      <table
        className="table table-success table-striped mt-3 mb-5"
        style={{ width: "80%" }}
      >
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {userreq.length !== 0 ? (
            userreq.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.date}</td>
                  <td>{e.time} slot</td>
                  <td>{e.wasteType}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* driver details */}
      <div className="heading1 mt-5">Driver</div>
      <table
        className="table table-success table-striped mt-3 mb-5"
        style={{ width: "80%" }}
      >
        <thead>
          <tr>
            <th scope="col">Truck Id</th>
            <th scope="col">Pincode</th>
            <th scope="col">zone</th>
          </tr>
        </thead>
        <tbody>
          {driver.length !== 0 ? (
            driver.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.truckID}</td>
                  <td>{e.pincode} </td>
                  <td>{e.zone}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
