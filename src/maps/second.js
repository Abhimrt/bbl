import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Second() {
  useEffect(() => {
    let map = L.map("map").setView([29.018865, 77.768095], 10);
    //for different view we can go https://leaflet-extras.github.io/leaflet-providers/preview/
    var googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );
    googleStreets.addTo(map);
     let a = L.Routing.control({
       waypoints: [
         [29.018865, 77.768095],
         [28.70406, 77.102493],
       ],
     });
     a.addTo(map);
    // if (!navigator.geolocation) {
    //   alert("Your browser doesn't support geolocation feature!");
    // } else {
    //   navigator.geolocation.getCurrentPosition(getPosition);
    // }
    // function getPosition(position) {
    //   let lat = position.coords.latitude;
    //   let long = position.coords.longitude;
    //   let a = L.Routing.control({
    //     waypoints: [
    //       [29.018865, 77.768095],
    //       [28.70406, 77.102493],
    //     ],
    //   });
    //   a.addTo(map);
    // }
  }, []);

  return (
    <>
    <h1>heading

    </h1>
      <div id="map" style={{ height: "70vh" }}></div>
    </>
  );
}