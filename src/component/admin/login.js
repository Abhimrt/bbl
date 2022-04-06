import React, { useState } from 'react'

export default function Login() {
  const [adminid,setAdminid] = useState("");
  const [pass,setPass] = useState("");
  const done=()=>{
    alert("done");
  }
  return (
    <div className="box center">
      <div className="heading1">Login</div>
      <input
        type="text"
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
