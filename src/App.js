import {
  Box,
  Button,
  position,
  TextField,
  Input,
  Grid,
  Fragment,
  // makeStyles
} from '@mui/material'
import { makeStyles } from '@mui/styles'
//import { FaLocationArrow, FaTimes } from 'react-icons/fa'
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

// const useStyle = makeStyles((theme) => ({
//   'textInput': { width: '100%', padding: '1rem' }
// }))

function App(props) {

  const [google] = useState(props);

  const [marker, setMarker] = useState()

  const { isLoaded } = useJsApiLoader({                               //this part where we load the map
    googleMapsApiKey: 'AIzaSyBY8p84HeEN5VfvYgxLypAmXc6hMwhX6TE',
    libraries: ['places']
  })

  Geocode.setApiKey("AIzaSyBY8p84HeEN5VfvYgxLypAmXc6hMwhX6TE");

  const [map, setMap] = useState(/** @type google.maps.Map */(null))  //useState will hold data before submit to db
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const originRef = useRef()


  function getPlace() {
    const value = document.getElementById('location').value;
    // console.log(value)
    Geocode.fromAddress(value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        center = { lat: lat, lng: lng };
        setMarker(center)
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

  function clearRoute() {
    setDirectionsResponse(null)
    document.getElementById('location').value = '';
    // originRef.current.value = ''
  }

  return (

    <React.Fragment>
      <div className='wrapper'>
        <div className='col-lg-8'>
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
        <div className='col-lg-4'>
          <img src={Search} className='schicon' onClick={() => getPlace()} />
        </div>
        {/* </item> */}
        {/* </Grid> */}
      </div>
      {/* <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          height: '50%',
          width: '100%',
          justifyContent: 'center',
          // backgroundColor: 'beige',
          zIndex: '99999',
          //gap: '10px'

        }}>
        <div className='wrapper'>
          <Autocomplete>
            <TextField id="location" variant='filled' label={'Enter a location'} placeholder={''} type='text' ref={originRef} onKeyPress={getPlace} />
          </Autocomplete> */}
      {/* <Button variant='contained' type='submit' onClick={getPlace} >Find</Button> */}
      {/* <div>
        <img src={Search} className='schicon' onClick={() => getPlace()} />
      </div>
      <Button variant='contained' type='submit' onClick={() => clearRoute()} >X</Button>
    </div>
      </Box > */}
      {/* 
      <Grid container lg={12}>
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%'
            //backgroundColor: 'beige'

          }}> */}

      {/* <Grid item lg={12}>
        <item> */}

      <div className='map'>
        <GoogleMap
          google={google}
          center={center}
          zoom={15}
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
          <Marker position={marker} />
          {console.log(marker, "getThisMarker")}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

    </React.Fragment>


    // <Flex
    //   position='relative'
    //   flexDirection='column'
    //   alignItems='center'
    //   h='100vh'
    //   w='100vw'
    // >

    //   <Box position='absolute' left={0} top={0} h='100%' w='100%'>
    //     {/* Google Map Box */}
    //     <GoogleMap
    //       center={center}
    //       zoom={15}
    //       mapContainerStyle={{ width: '100%', height: '100%' }}
    //       options={{
    //         zoomControl: false,
    //         streetViewControl: false,
    //         mapTypeControl: false,
    //         fullscreenControl: false,
    //       }}
    //       onLoad={map => setMap(map)}
    //     >
    //       <Marker position={center} />
    //       {directionsResponse && (
    //         <DirectionsRenderer directions={directionsResponse} />
    //       )}
    //     </GoogleMap>
    //   </Box>
    //   <Box
    //     p={4}
    //     borderRadius='lg'
    //     m={4}
    //     bgColor='white'
    //     shadow='base'
    //     minW='container.md'
    //     zIndex='1'
    //   >
    //     <HStack spacing={2} justifyContent='space-between'>
    //       <Box flexGrow={1}>
    //         <Autocomplete>
    //           <Input type='text' placeholder='Origin' ref={originRef} />
    //         </Autocomplete>
    //       </Box>

    //       <ButtonGroup>
    //         <Button colorScheme='pink' type='submit' onClick={getPlace} >
    //           Place
    //         </Button>
    //         <IconButton
    //           aria-label='center back'
    //           icon={<FaTimes />}
    //           onClick={clearRoute}
    //         />
    //       </ButtonGroup>
    //     </HStack>
    //   </Box>
    // </Flex>
  )
}

export default App