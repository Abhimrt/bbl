import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import link from '../../link/requests'
import links from '../../link/user'

export default function Logedin() {
  const navigate = useNavigate();
  const [amt, setAmt] = useState(1);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [type, setType] = useState();
  const [req, setReq] = useState([]);

  useEffect(async () => {
    let a = await links.pending();
    setReq(a.Request);

  }, []);

  const filldata = async () => {
    let a = await links.pending();
    setReq(a.Request);
  }
  //validation for date ===================
  let d = new Date();
  let dd = d.getDate();
  let dm = d.getMonth() + 1;
  let one, two;
  let da = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  if (dd + 1 > da[dm]) {
    dd = (dd + 1) % da[dm];
    dm === 12 ? (dm = 1) : dm++;
  } else dd = dd + 1;
  one = `${dd}-${dm}`;
  if (dd + 1 > da[dm]) {
    dd = (dd + 1) % da[dm];
    dm === 12 ? (dm = 1) : dm++;
  } else dd = dd + 1;
  two = `${dd}-${dm}`; //validation of date over

  // done and sending request ================
  async function done() {
    if (date && time && type && amt) {
      let a = await link.Add({
        date: date,
        time: time,
        wasteType: type,
        amount: amt,
      });

    } else alert("enter all details properly");
    // filldata();
  }
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
        <div className="heading1">Schedule</div>
        <h4>Date</h4>
        <div className="center  pb-3">
          <div className="mx-3">
            <input
              className="form-check-input"
              type="radio"
              id="inlineCheckbox1"
              value="option1"
              name="date"
              onChange={() => setDate(one)}
            />
            <span>{one}</span>
          </div>
          <div className="mx-3">
            <input
              className="form-check-input "
              type="radio"
              id="inlineCheckbox1"
              value="option1"
              name="date"
              onChange={() => setDate(two)}
            />
            <span>{two}</span>
          </div>
        </div>
        <br />
        <h4>TIME</h4>
        <div className="center  pb-3">
          <input
            className="form-check-input"
            type="radio"
            id="inlineCheckbox1"
            value="option1"
            name="time"
            onChange={() => setTime(1)}
          />
          <span>Morning (9:00am-12:00pm)</span>
          <input
            className="form-check-input"
            type="radio"
            id="inlineCheckbox1"
            value="option1"
            name="time"
            onChange={() => setTime(2)}
          />
          <span>Afternoon (1:00pm-4:00pm)</span>
          <input
            className="form-check-input"
            type="radio"
            id="inlineCheckbox1"
            value="option1"
            name="time"
            onChange={() => setTime(3)}
          />
          <span>Evening (5:00pm-7:00pm)</span>
        </div>
        <h4>Type of garbage</h4>
        <div className="checkbox  pt-2 ">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="waste"
              id="inlineCheckbox1"
              value="option1"
              onChange={() => setType("organic")}
            />
            <label className="form-check-label">Organic waste</label>
          </div>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="waste"
              id="inlineCheckbox2"
              value="option2"
              onChange={() => setType("recyclable")}
            />
            <label className="form-check-label">Recyclable waste</label>
          </div>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="waste"
              id="inlineCheckbox2"
              onChange={() => setType("toxic")}
              value="option2"
            />
            <label className="form-check-label">Toxic waste</label>
          </div>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="waste"
              id="inlineCheckbox2"
              value="option2"
              onChange={() => setType("electronic")}
            />
            <label className="form-check-label">Electronic waste</label>
          </div>
        </div>
        <p>
          <button
            className="btn btn-success"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Description
          </button>
        </p>
        <div className="collapse" id="collapseExample" style={{ width: "80%" }}>
          <div className="card card-body center">
            Organic waste || (kitchen waste, vegetables, flowers, leaves,
            fruits)
            <br /> <br />
            Recyclable waste || (paper, glass, metals, plastics)
            <br />
            <br /> Toxic waste || (old medicines, paints, chemicals, bulbs,
            spray cans, etc.)
            <br />
            <br /> Electronic waste || (batteries, phones, TVs, laptops)
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/07ym6iZNMQU"
              title="YouTube video player"
              frameBorder="0"
              className="mt-2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZzeMvW5qvwM"
              title="YouTube video player"
              frameBorder="0"
              className="mt-2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/CmP67zq5hfo"
              title="YouTube video player"
              frameBorder="0"
              className="mt-2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="center">
          <input
            type="range"
            className="range"
            min="1"
            max="20"
            id="customRange2"
            value={amt}
            onChange={(e) => {
              setAmt(e.target.value);
            }}
          />
          <span>{amt}kg</span>
        </div>
        <button onClick={done}>Done</button>
      </div>
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
          {req.length !== 0 ? (
            req.map((e, i) => {
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
    </>
  );
}
