import React, {  useState } from "react";

export default function Logedin() {
  const [amt, setAmt] = useState(1);
  let d = new Date();
  let dd = d.getDate();
  let dm = d.getMonth() + 1;
  let one,two

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
  // logic for date
  if (dd + 1 > da[dm]) {
    dd = (dd + 1) % da[dm];
    dm === 12 ? (dm = 1) : dm++;
  } else dd = dd + 1;
  one = `${dd}/${dm}`;
  if (dd + 1 > da[dm]) {
    dd = (dd + 1) % da[dm];
    dm === 12 ? (dm = 1) : dm++;
  } else dd = dd + 1;
  two= `${dd}/${dm}`;
 

  return (
    <>
      <div className="box center">
        <div className="heading1">Shedule</div>
        <h4>Date</h4>
        <div className="center  pb-3">
          <div className="mx-3">
            <input
              className="form-check-input"
              type="radio"
              id="inlineCheckbox1"
              value="option1"
              name="date"
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
          />
          <span>Morning (9:00am-12:00pm)</span>
          <input
            className="form-check-input"
            type="radio"
            id="inlineCheckbox1"
            value="option1"
            name="time"
          />
          <span>Afternoon (1:00pm-4:00pm)</span>
          <input
            className="form-check-input"
            type="radio"
            id="inlineCheckbox1"
            value="option1"
            name="time"
          />
          <span>Evening (5:00pm-7:00pm)</span>
        </div>
        <h4>Type of garbage</h4>
        <div className="checkbox  pt-2 ">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label className="form-check-label">Organic waste</label>
          </div>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label">Recyclable waste</label>
          </div>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label">Toxic waste</label>
          </div>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
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
          <div className="card card-body">
            Organic waste || (kitchen waste, vegetables, flowers, leaves,
            fruits)
            <br /> <br />
            Recyclable waste || (paper, glass, metals, plastics)
            <br />
            <br /> Toxic waste || (old medicines, paints, chemicals, bulbs,
            spray cans, etc.)
            <br />
            <br /> Electronic waste || (batteries, phones, TVs, laptops)
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
          />{" "}
          <span>{amt}kg</span>
        </div>
        <button>Done</button>
      </div>
    </>
  );
}
