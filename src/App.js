import {TextField} from '@mui/material'
import Geocode from "react-geocode";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import React, { useRef, useState } from 'react'
import "./App.css"
import Search from "./img/search.png"

var center = { lat: 4.8584, lng: 102.2945 }                           //default coordinate for marker

function App(props) {

  const [google] = useState();

  const [marker, setMarker] = useState()

  const { isLoaded } = useJsApiLoader({                               //this part where we load the page and use API key for google API Service
    googleMapsApiKey: 'AIzaSyBY8p84HeEN5VfvYgxLypAmXc6hMwhX6TE',
    libraries: ['places']
  })

  Geocode.setApiKey("AIzaSyBY8p84HeEN5VfvYgxLypAmXc6hMwhX6TE");       //API key for Geocode API Service

  const [map, setMap] = useState(/** @type google.maps.Map */(null))  //useState will hold data before submit to db
  const [directionsResponse, setDirectionsResponse] = useState(null)      
  const originRef = useRef()                                          


  function getPlace() {         //Function to get the coordinate of the place entered by user 
    const value = document.getElementById('location').value;
    console.log(value,"getValue")
    Geocode.fromAddress(value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        center = { lat: lat, lng: lng };
        setMarker(center)                      //and set the marker to coordinate
        map.setCenter({     
          lat: lat,
          lng: lng
        });
      },
      (error) => {
        console.error(error);
      }
    );

  }

  // function clearRoute() {
  //   setDirectionsResponse(null)
  //   document.getElementById('location').value = '';
  //   // originRef.current.value = ''
  // }

  return (

    <React.Fragment>
      <div className='wrapper'>
        <div className='col-lg-8'>
          {/* Autocomplete textfield where user enter location */}
          <Autocomplete>            
            <TextField
              id="location"
              variant='filled'
              label={'Enter a location'}
              placeholder={''}
              type='text'
              ref={originRef}
              onKeyPress={getPlace}
              style={{ width: '80rem' }}
            />
          </Autocomplete>
        </div>
        {/* search icon that return the location entered on map */}
        <div className='col-lg-4'>
          <img src={Search} className='schicon' onClick={() => getPlace()} />   
        </div>
      </div>


      <div className='map'>
        {/* Show google map */}
        <GoogleMap
          google={google}
          center={center}
          zoom={5}
          // className={css.maps}
          mapContainerStyle={{ width: '100%', height: '100%', overflow: 'visible', position: 'absolute' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          {/* Show marker */}
          <Marker position={marker} />
          {/* {console.log(marker, "getThisMarker")} */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

    </React.Fragment>

  )
}

export default App