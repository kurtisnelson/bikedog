import React from "react"
import { Helmet } from "react-helmet"
import { BottomNavigationAction } from "gatsby-theme-material-ui"
import { BottomNavigation } from "@material-ui/core"
import ExploreIcon from "@material-ui/icons/Explore"
import HomeIcon from "@material-ui/icons/Home"
import PropTypes from "prop-types"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: "home",
    }
  }

  static get propTypes() {
    return {
      children: PropTypes.object,
    }
  }

  render() {
    return (
      <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
        <Helmet titleTemplate="%s - BikeDog" defaultTitle="BikeDog">
          <meta name="description" content="Urbanism is fun" />
        </Helmet>
        <h1>BikeDog</h1>
        {this.props.children}
        <BottomNavigation
          value={this.state.currentPage}
          onChange={(event, newValue) => {
            this.setState({
              currentPage: newValue,
            })
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            to="/"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Nearby Parks"
            value="parks"
            to="/parks"
            icon={<ExploreIcon />}
          />
        </BottomNavigation>
      </div>
    )
  }
}

export default Layout
