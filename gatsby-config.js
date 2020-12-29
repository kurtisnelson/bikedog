module.exports = {
  siteMetadata: {
    title: "BikeDog",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    "gatsby-plugin-loadable-components-ssr",
    "gatsby-theme-material-ui",
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: "en",
        useLangKeyLayout: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BikeDog`,
        short_name: `BikeDog`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
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
          measurementId: "G-4C5SQHQFG0",
        },
      },
    },
    {
      resolve: "gatsby-plugin-prettier-eslint",
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            "**/*.{css,scss,less}",
            "**/*.{json,json5}",
            "**/*.{graphql}",
            "**/*.{md,mdx}",
            "**/*.{html}",
            "**/*.{yaml,yml}",
          ],
        },
        eslint: {
          patterns: "**/*.{js,jsx,ts,tsx}",
          customOptions: {
            fix: true,
            cache: true,
          },
        },
      },
    },
    "gatsby-plugin-offline",
  ],
}
