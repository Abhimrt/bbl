import { useRef, useEffect, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
// import "./Map.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const Map = () => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(77.7064);
  const [latitude, setLatitude] = useState(28.9845);
  const [long, setLong] = useState(77.1025);
  const [lat, setLat] = useState(28.7041);

 
  

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
      }, 200);
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
  }, [longitude, latitude,lat,long]);

  return (
    <>
      <div className="body">
        {map && (
          <div className="app">
            <div ref={mapElement} className="map" />
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
