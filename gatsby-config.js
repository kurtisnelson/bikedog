module.exports = {
  siteMetadata: {
    title: "Closest Park",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyCT0PKVJLCc_VTzqd9ZkcHpjtTMOpg_wY8",
          authDomain: "closest-park-sf.firebaseapp.com",
          projectId: "closest-park-sf",
          storageBucket: "closest-park-sf.appspot.com",
          messagingSenderId: "934785812551",
          appId: "1:934785812551:web:fe657c88028eaed71d0962",
          measurementId: "G-C251SRX7VC",
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "GA-256859393", // Google Analytics / GA
        ],
      },
    },
  ],
}
