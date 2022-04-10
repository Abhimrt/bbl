import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import link from "../../link/user";
import L from "leaflet";
import png from "../../images/user.png";

export default function Signin() {
  const navigate = useNavigate();
    const [name, setName] = useState("");
    const [zone, setZone] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [pin, setPin] = useState("");
    const [pindata, setPindata] = useState([]);
    const [latitude, setLatiude] = useState();
    const [longitude, setLongitude] = useState();

  // map=============================================
  let map;
    function MAP (){
      if(latitude) done()
      alert("We want to take your live location for your comfort.")
      map = L.map("map").setView([29.018865, 77.768095], 10);
    //for different view we can go https://leaflet-extras.github.io/leaflet-providers/preview/
    var googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );
    googleStreets.addTo(map);

    var myIcon = L.icon({
      iconUrl: png,
      iconSize: [50, 50],
      iconAnchor: [50, 50],
    });

    if (!navigator.geolocation) {
      alert("Your browser doesn't support geolocation feature!");
    } else {
      navigator.geolocation.getCurrentPosition(getPosition);
      var time = setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
      }, 200);
    }

    var marker, circle;

    function getPosition(position) {
      // console.log(position)
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      // console.log(accuracy);
     
      if (marker) {
        map.removeLayer(marker);
      }

      if (circle) {
        map.removeLayer(circle);
      }

      marker = L.marker([lat, long], { icon: myIcon });
      circle = L.circle([lat, long], { radius: accuracy });

      var featureGroup = L.featureGroup([marker, circle]).addTo(map);

      map.fitBounds(featureGroup.getBounds());

      setLongitude(long);
         setLatiude(lat);
         if(accuracy<=500)
         {
           clearInterval(time)
        }
    }}


  useEffect(() => {
    done()
  }, [latitude])
  



  // validation for mobile no. ===============
  const Mob = (e) => {
    if (e.length <= 10) setPhone(e);
  };

  // code on entering the pincode zone will be return
  const PIN = (e) => {
    if (e.length <= 6) setPin(e);
    if (e.length === 6) detail(e);
    else {
      setPindata([]);
      setZone("");
    }
  };

  //validation for re enter password======================
  function PASS(e) {
    
    if((password.length === e.length && password !== e) || (password.length < e.length))  {
      alert("password was to be same");
      setPassword("");
      setRepassword("");
    }else setRepassword(e);
  }

  // to get the zone acc to the pin   ====================

  const detail = async (e) => {
    const response = await fetch("https://api.postalpincode.in/pincode/" + e);
    const data = await response.json();
    if (data[0].Status === "Success") {
      setPindata(data[0].PostOffice);
    } else {
      setZone("");
      setPindata([]);
      alert("Enter valid Pincode");
    }
  };

  // ON done this will we execute ====================

  async function  done() {
    if (
      phone.length === 10 &&
      password.length >= 8 &&
      name &&
      pin &&
      zone
    ) {
      let a = await link.Create({
        name: name,
        phone: phone,
        password: password,
        pincode: pin,
        zone: zone,
        latitude: latitude,
        longitude: longitude,
      });
      if(a)navigate("/")
    } else if (latitude) {
      alert( "enter correct details")
      console.log( phone,
      password,
      name ,
      pin ,
      zone ,
      latitude )
    }
  }

  // return===============
  return (
    <>
        <div className="box center">
          <div className="heading1">Sign in</div>
          <input
            type="number"
            placeholder="Mobile number"
            value={phone}
            onChange={(e) => Mob(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
          />
          <input
            type="number"
            placeholder="Pincode"
            value={pin}
            onChange={(e) => PIN(e.target.value)}
          />
          <label>Select your Area:</label>
          <select value={zone} onChange={(e) => setZone(e.target.value)}>
            {pindata.map((e, i) => {
              return <option key={i}>{e.Name}</option>;
            })}
          </select>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={repassword}
            onChange={(e) => PASS(e.target.value)}
          />
          <button onClick={MAP}>Sign up</button>
          <p onClick={() => navigate("/user")} className="link">
            Already have an account | click here |
          </p>
        </div>
        <div id="map" style={{ height: "70vh" }}></div>
    </>
  );
}
