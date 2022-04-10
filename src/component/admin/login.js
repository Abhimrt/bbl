import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import link from "../../link/admin";

export default function Login() {
  const navigate = useNavigate();
  const [adminid,setAdminid] = useState("");
  const [pass,setPass] = useState("");

  // sending request and velidation
  const done= async()=>{
    let a = await link.Login({
      password: pass,
      email: adminid,
    });
    if(a) navigate("/admin/logedin")
  }
  return (
    <div className="box center">
      <div className="heading1">Login</div>
      <input
        type="mail"
        placeholder="Admin id"
        value={adminid}
        onChange={(e) => setAdminid(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={done}>Login </button>
    </div>
  );
}
