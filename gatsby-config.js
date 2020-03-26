require("dotenv").config()

module.exports = {
  pathPrefix: `/blog`,
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 900,
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    /* {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    }, */
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `5jzpzmwjn9yr`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Adam Siekierski Blog`,
        short_name: "adamsiekierski",
        start_url: "/",
        backgroundColor: "black",
        themeColor: "white",
        display: "standalone",
        icon: "src/assets/favicon/favicon.png",
      },
    },
  ],
}
