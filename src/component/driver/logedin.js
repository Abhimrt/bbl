import React, { useRef, useEffect, useState } from "react";
import link from "../../link/search";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useNavigate } from "react-router-dom";

export default function Logedin() {
  const navigate = useNavigate();
  const [data,setData] = useState([])
  // maps use state =====================
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(77.7064);
  const [latitude, setLatitude] = useState(28.9845);
  const [long, setLong] = useState(77.7064);
  const [lat, setLat] = useState(28.9845);

  useEffect(async () => {
    let a = await link.driverRequest();
    setData(a.Request)
  }, []);
  

  //maps script==========================
   const convertToPoints = (lngLat) => {
     return {
       point: {
         latitude: lngLat.lat,
         longitude: lngLat.lng,
       },
     };
   };

   const drawRoute = (geoJson, map) => {
     if (map.getLayer("route")) {
       map.removeLayer("route");
       map.removeSource("route");
     }
     map.addLayer({
       id: "route",
       type: "line",
       source: {
         type: "geojson",
         data: geoJson,
       },
       paint: {
         "line-color": "#4a90e2",
         "line-width": 6,
       },
     });
   };

   const addDeliveryMarker = (lngLat, map) => {
     const element = document.createElement("div");
     element.className = "marker-delivery";
     new tt.Marker({
       element: element,
     })
       .setLngLat(lngLat)
       .addTo(map);
   };

   useEffect(() => {
     if (!navigator.geolocation) {
       alert("Your browser doesn't support geolocation feature!");
     } else {
       navigator.geolocation.getCurrentPosition(getPosition);
       var time = setInterval(() => {
         navigator.geolocation.getCurrentPosition(getPosition);
       }, 2000);
     }

     function getPosition(position) {
       var lat = position.coords.latitude;
       var long = position.coords.longitude;
       var accuracy = position.coords.accuracy;
       setLongitude(long);
       setLatitude(lat);
     }

     const origin = {
       lng: longitude,
       lat: latitude,
     };
     const destinations = [];

     let map = tt.map({
       key: "BhbefEH2zspjSSjeJ7Y0JI4GgewkVxVQ",
       container: mapElement.current,
       center: [longitude, latitude],
       zoom: 14,
     });
     setMap(map);

     const addMarker = () => {
       const popupOffset = {
         bottom: [0, -25],
       };
       const popup = new tt.Popup({ offset: popupOffset }).setHTML(
         "This is you!"
       );
       const element = document.createElement("div");
       element.className = "marker";

       const marker = new tt.Marker({
         draggable: true,
         element: element,
       })
         .setLngLat([longitude, latitude])
         .addTo(map);

       marker.on("dragend", () => {
         const lngLat = marker.getLngLat();
         setLongitude(lngLat.lng);
         setLatitude(lngLat.lat);
       });

       marker.setPopup(popup).togglePopup();
     };
     addMarker();

     const sortDestinations = (locations) => {
       const pointsForDestinations = locations.map((destination) => {
         return convertToPoints(destination);
       });
       const callParameters = {
         key: "BhbefEH2zspjSSjeJ7Y0JI4GgewkVxVQ",
         destinations: pointsForDestinations,
         origins: [convertToPoints(origin)],
       };

       return new Promise((resolve, reject) => {
         ttapi.services
           .matrixRouting(callParameters)
           .then((matrixAPIResults) => {
             const results = matrixAPIResults.matrix[0];
             const resultsArray = results.map((result, index) => {
               return {
                 location: locations[index],
                 drivingtime: result.response.routeSummary.travelTimeInSeconds,
               };
             });
             resultsArray.sort((a, b) => {
               return a.drivingtime - b.drivingtime;
             });
             const sortedLocations = resultsArray.map((result) => {
               return result.location;
             });
             resolve(sortedLocations);
           });
       });
     };

     const recalculateRoutes = () => {
       sortDestinations(destinations).then((sorted) => {
         sorted.unshift(origin);

         ttapi.services
           .calculateRoute({
             key: "BhbefEH2zspjSSjeJ7Y0JI4GgewkVxVQ",
             locations: sorted,
           })
           .then((routeData) => {
             const geoJson = routeData.toGeoJson();
             drawRoute(geoJson, map);
           });
       });
     };
     // position
     destinations.push({ lng: long, lat: lat });
     addDeliveryMarker({ lng: long, lat: lat }, map);
     recalculateRoutes();
     //
     return () => map.remove();
   }, [longitude, latitude, lat, long]);
  //maps script end===================
  //for user location================
  async function  locate  (e){
    // let a = await link.userById({
    //   id: e,
    // });
    // console.log(a);
    document.querySelector(".body").style.display="flex"
  }

  //logout ==========================
  function logout(){
    localStorage.clear();
    navigate("/")
  }
  return (
    <>
      <div className="logout center" onClick={logout}>
        logout
      </div>
      {/* maps */}
      <div className="body" style={{display:"none"}}>
        {map && (
          <div className="app">
            <div ref={mapElement} className="map" />
          </div>
        )}
      </div>
      {/* maps end */}
      {/* table ============ */}
      <div className="heading1 mt-5" id="data">
        Request
      </div>
      <table
        className="table table-success table-striped mt-3 mb-5"
        style={{ width: "80%" }}
      >
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map((e, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => locate(e.user)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{e.user}</td>
                  <td>{e.amount}kg</td>
                  <td>{e.wasteType}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
