import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import link from "../../link/user"

export default function Login() {
  const navigate = useNavigate();
  const [mob, setMob] = useState("");
  const [pass, setPass] = useState("");
  const Mob = (e)=>{
    if(e.length<=10)
    setMob(e);
  }
  const done=()=>{
    if(mob.length===10 && pass.length>=8){
    link.login({
      "phone":mob,
      "password":pass
    })
    }
    else {
      alert("Enter Valid details");
    }
  }
  return (
    <>
      <div className="box center">
        <div className="heading1">Login</div>
        <input
          type="text"
          placeholder="mobile number"
          value={mob}
          onChange={(e) => Mob(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={done}>Login </button>
        <p onClick={() => navigate("/user/signin")} className="link">
          Don't have an account | click here |
        </p>
      </div>
    </>
  );
}
