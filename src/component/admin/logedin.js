import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logedin() {
  const navigate = useNavigate();
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
        <button onClick={() => navigate("/admin/data")} className="pb-2 mb-5">
          See Request
        </button>
        <button onClick={() => navigate("/admin/edit")}>Edit Truck</button>
      </div>
    </>
  );
}
