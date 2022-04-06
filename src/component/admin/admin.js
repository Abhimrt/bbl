import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Data from './data';
import Edit from './edit';
import Logedin from './logedin';
import Login from './login';

export default function Admin() {
  return (
    <>
      <div className="heading"> Admin </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logedin" element={<Logedin />} />
        <Route path="/data" element={<Data />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}
