import React from "react"
import { distanceBetween, geohashQueryBounds } from "geofire-common"
import PropTypes from "prop-types"
import firebase from "gatsby-plugin-firebase"

class Closest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      parks: [],
    }
    this.db = firebase.firestore()
    this.db.enablePersistence()
  }

  static get propTypes() {
    return {
      lat: PropTypes.number,
      lng: PropTypes.number,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      this.fetchParks()
    }
  }

  componentDidMount() {
    this.fetchParks()
  }

  fetchParks() {
    this.fetchNearby(this.props.lat, this.props.lng)
      .then(parks => {
        this.setState({ parks: parks, isLoaded: true })
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }

  render() {
    const { error, isLoaded, parks } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <div>
          Finding parks near {this.props.lat},{this.props.lng}
        </div>
      )
    } else {
      return (
        <div>
          <p>Your closest parks are:</p>
          <ul>
            {parks.map(park => (
              <li key={park.id}>{park.data.map_label}</li>
            ))}
          </ul>
          <p>
            Using {this.props.lat}, {this.props.lng} as your location.
          </p>
        </div>
      )
    }
  }

  fetchNearby(lat, lng) {
    const center = [lat, lng]
    const radiusInKm = 0.5

    const bounds = geohashQueryBounds(center, radiusInKm)
    const promises = []

    // TODO: Figure out why the Firestore example for geohash search is broken.
    // for (const b of bounds) {
    const q = this.db.collection("parks").orderBy("geohash")
    // .startAt(b[0])
    // .endAt(b[1])

    // console.log("query: " + b[0] + " " + b[1])
    promises.push(q.get())
    // }

    // Collect all the query results together into a single list
    return Promise.all(promises)
      .then(snapshots => {
        const matchingDocs = new Map()
        console.log("snapshots: " + snapshots.length)

        for (const snap of snapshots) {
          console.log("docs: " + snap.docs.length)
          for (const doc of snap.docs) {
            const location = doc.get("location")

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distance = distanceBetween(
              [location.latitude, location.longitude],
              center
            )
            if (distance <= radiusInKm) {
              matchingDocs.set(doc.id, doc.data())
            }
          }
        }
        console.log("close: " + matchingDocs.size)
        return matchingDocs
      })
      .then(docs => {
        const parks = []
        for (const [id, park] of docs.entries()) {
          parks.push({ id: id, data: park })
        }
        return parks
      })
  }
}

export default Closest
