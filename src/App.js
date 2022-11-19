import { NavLink, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import User from './component/user/user';
import Admin from './component/admin/admin';
import Driver from './component/driver/driver';
import Main from "./main";
import "leaflet/dist/leaflet.css"
import "./css/style.css"
import "./css/Map.css"
import ChatBot from "react-simple-chatbot"
import { useState } from "react";


function App() {
  // const navigate = useNavigate();
  const [chat, setChat] = useState(true);
  const steps = [

    {
      id: "Greet",
      message: "Hello, Welcome to our Portal",
      trigger: "Done",
    },

    {
      id: "Done",
      message: "Please enter your name!",
      trigger: "waiting1",
    },

    {
      id: "waiting1",
      user: true,
      trigger: "Name",
    },

    {
      id: "Name",
      message: "Hi {previousValue}, Please select your issue",
      trigger: "issues",
    },

    {
      id: "issues",
      options: [
        {
          value: "Truck not arive",
          label: "truck",
          trigger: "truck",
        },
        { value: "Request not showing", label: "request", trigger: "request" },
      ],
    },
    {
      id: "truck",
      message:
        "Thanks for letting your Truck issue, Please enter your mail id",
      trigger: "waiting_truck"
    },
    {
      id: "waiting_truck",
      user: true,
      trigger: "end",
    },
    {
      id: "end",
      message:
        "Our team will resolve your issue ASAP.",
      end: true,
    },
    {
      id: "request",
      message:
        "Thanks for letting your Request issue, Please enter your mail id",
      trigger: "waiting_req"
    },
    {
      id: "waiting_req",
      user: true,
      trigger: "end",
    },
    {
      id: "end",
      message:
        "Our team will resolve your issue ASAP.",
      end: true,
    },

  ];



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
        {
          chat ? (
            <button onClick={() => (chat) ? setChat(false) : setChat(true)} className="chat"> Chat with us </button>
          ) : (
            <ChatBot className="chat" steps={steps}></ChatBot>
          )
        }

      </div>
    </>
  );
}

export default App;
