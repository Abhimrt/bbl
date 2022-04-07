import { NavLink, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import User from './component/user/user';
import Admin from './component/admin/admin';
import Driver from './component/driver/driver';
import Main from "./main";
// import "./css/style.css"
import "leaflet/dist/leaflet.css"
import Second from "./maps/second";


function App() {
  // const navigate = useNavigate();
  // const pincode = require("pincode-lat-long");
  // console.log(pincode.getlatlong(250001));

     
  return (
    <>
      <div className="Main">
        <NavLink to={"/"}>
          <img
            src={require("./images/logo.jpeg")}
            alt=""
          />
        </NavLink>
        <div id="map" style={{height:"60vh"}}>f
        </div>
          <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/driver/*" element={<Driver />} />
          <Route path="/driver/*" element={<Driver />} />
          <Route path="/map" element={<Second/>}/>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
