import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import User from './component/user/user';
import Admin from './component/admin/admin';
import Driver from './component/driver/driver';
import Main from "./main";
import "./css/style.css"

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="Main">
        <NavLink to={"/"}>
          <img
            src={require("./images/logo.jpeg")}
            alt=""
          />
        </NavLink>
          <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/driver/*" element={<Driver />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
