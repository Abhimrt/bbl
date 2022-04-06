import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Logedin from './logedin';
import Login from './login';

export default function Driver() {
  return (
    <>
      <div className="heading"> Driver </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logedin" element={<Logedin />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}
