import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logedin() {
  const navigate = useNavigate();
  return (
    <>
      <div className="box center">
        <button onClick={() => navigate("/admin/data")} className="pb-2">See Request</button>
        <button onClick={() => navigate("/admin/edit")}>Edit Truck</button>
      </div>
    </>
  );
}
