import React from "react"
import { distanceBetween, geohashQueryBounds } from "geofire-common"
import PropTypes from "prop-types"
import Park from "../components/park"
import firebase from "gatsby-plugin-firebase"

class Closest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      parks: [],
    }
    this.analytics = firebase.analytics()
    this.db = firebase.firestore()
    this.db.enablePersistence()
  }

  static get propTypes() {
    return {
            userLoc: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
            }).isRequired,
      parkRadiusKm: PropTypes.number,
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userLoc !== this.props.userLoc ||
      prevProps.parkRadiusKm !== this.props.parkRadiusKm
    ) {
      this.fetchParks()
    }
  }

  componentDidMount() {
    this.fetchParks()
  }

  fetchParks() {
    this.fetchNearby(this.props.userLoc, this.props.parkRadiusKm)
      .then(parks => {
        this.setState({ parks: parks, isLoaded: true })
        this.analytics.logEvent("found_nearby_parks", { count: parks.size })
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
          Finding parks near {this.props.userLoc.lat},{this.props.userLoc.lng}
        </div>
      )
    } else {
      return (
        <div>
          <p>Your closest parks are:</p>
          <ul>
            {parks.map(park => (
              <li key={park.id}><Park id={park.id} data={park.data} userLoc={this.props.userLoc}/></li>
            ))}
          </ul>
          <p>
            Using {this.props.userLoc.lat}, {this.props.userLoc.lng} as your location.
          </p>
        </div>
      )
    }
  }

  fetchNearby(userLoc, radiusInKm) {
    const center = [userLoc.lat, userLoc.lng]

    const bounds = geohashQueryBounds(center, radiusInKm * 1000)
    const promises = []

    for (const b of bounds) {
      const q = this.db
        .collection("parks")
        .orderBy("geohash")
        .startAt(b[0])
        .endAt(b[1])

      promises.push(q.get())
    }

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
