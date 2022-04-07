import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Second() {
  useEffect(() => {
    var map = L.map("map").setView([51.505, -0.09], 11);
    //for different view we can go https://leaflet-extras.github.io/leaflet-providers/preview/
    var OPNVKarte = L.tileLayer(
      "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
    );
    OPNVKarte.addTo(map)
  }, []);

  return (
    <>
    <h1>heading

    </h1>
      <div id="map" style={{ height: "70vh" }}></div>
    </>
  );
}