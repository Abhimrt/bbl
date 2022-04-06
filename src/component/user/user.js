import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Logedin from './logedin';
import Login from './login';
import Signin from './signin';

export default function User() {
  return (
    <>
      <div className="heading"> User </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logedin" element={<Logedin />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}
