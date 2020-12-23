import React from "react"
import Parks from "../components/parks"
import firebase from "gatsby-plugin-firebase"

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  useEffect() {
    const remoteConfig = firebase.remoteConfig()
    remoteConfig.defaultConfig = {
      park_radius_km: 0.5,
    }
    remoteConfig.activate()
    remoteConfig.fetch()
  }
  render() {
    return (
      <div>
        <h1>BikeDog</h1>
        <Parks />
      </div>
    )
  }
}

export default Home
