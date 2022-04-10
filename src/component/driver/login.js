import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import link from "../../link/driver";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState()
  const [pass, setPass] = useState()
  //for id velidation =================
  function ID(e){
   if (e.length <= 10) setId(e.toUpperCase());
  }
  function PASS(e){
   if (e.length <= 6) setPass(e);
  }
  //when we wnt toi send response====================
     async function  done(){
       if(pass.length===6 && id){
        let a = await link.Login({
          password: pass,
          truckID: id
        });
        if(a) navigate("/driver/logedin")
       }else alert ("Enter valid details")
     }
  return (
    <div className="box center">
      <div className="heading1">Login</div>
      <input type="text" placeholder="Truck id" value={id} onChange={(e)=>ID(e.target.value)}/>
      <input type="password" placeholder="Unique Pin" value={pass} onChange={(e)=>PASS(e.target.value)}/>
      <button onClick={done}>Login </button>
    </div>
  );
}
