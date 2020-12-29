import React from "react"
import { Helmet } from "react-helmet"
export default function Layout({ children }) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
      <Helmet titleTemplate="%s - BikeDog" defaultTitle="BikeDog">
        <meta name="description" content="Urbanism is fun" />
      </Helmet>
      <h1>BikeDog</h1>
      {children}
    </div>
  )
}
