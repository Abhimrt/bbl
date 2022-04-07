import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Main() {
    const navigate = useNavigate();
   
  return (
    <>
      <div className="main center">
        <button onClick={() => navigate("/user")}>User</button> <br/>
        <button onClick={() => navigate("/driver")}>Driver</button><br/>
        <button onClick={() => navigate("/admin")}>Admin</button><br/>
      </div>
    </>
  );
}
