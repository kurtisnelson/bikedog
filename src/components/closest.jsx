import React from "react"

export default class Closest extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    parks: [],
  }

  componentDidMount() {}

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
              <li key={park.globalid}>{park.map_label}</li>
            ))}
          </ul>
          <p>
            Using {this.props.lat}, {this.props.lng} as your location.
          </p>
        </div>
      )
    }
  }
}
