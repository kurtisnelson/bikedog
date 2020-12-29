import React from "react"
import Parks from "../components/parks"
import firebase from "gatsby-plugin-firebase"
import { Helmet } from "react-helmet"

class WalkableParks extends React.Component {
  constructor(props) {
    super(props)
  }
  useEffect() {
    firebase.analytics()
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
        <Helmet>
          <title>Nearby Parks</title>
        </Helmet>
        <Parks />
      </div>
    )
  }
}

export default WalkableParks
