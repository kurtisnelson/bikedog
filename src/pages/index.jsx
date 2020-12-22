import React from "react"
import Closest from "../components/closest"
import { geolocated } from "react-geolocated"

const Home = (props) => (
                <div>
                        <h1>Closest Parks</h1>
                        <p>Find the closest parks to you in San Francisco.</p>
                 {!props.isGeolocationAvailable ? (
                                     <div>Your browser does not support Geolocation.</div>
                                             ) : !props.isGeolocationEnabled ? (
                                                 <div>Geolocation is not enabled.</div>
                                                         ) : props.coords ? (
                                                                 <Closest lat={props.coords.latitude} lng={props.coords.longitude}/>
                                                         ) : (
                                                                 <div>Fetching location</div>
                                                         )}
                </div>
        )

export default geolocated({
            positionOptions: {
                            enableHighAccuracy: true,
                        },
})(Home);
