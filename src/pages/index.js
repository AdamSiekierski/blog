import React from "react"
import { graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"
import Layout from "../components/Layout/Layout"
import MainPagePost from "../components/MainPagePost/MainPagePost"

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`

const IndexPage = ({ data }) => {
  return (
    <>
      <GlobalStyles />
      <Layout title="home">
        {data.allContentfulPost.nodes.map(item => {
          return <MainPagePost post={item} key={item.id} />
        })}
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allContentfulPost(sort: { fields: date, order: DESC }) {
      nodes {
        content {
          childMarkdownRemark {
            excerpt(pruneLength: 350)
          }
        }
        id
        date
        title
        url
      }
    }
  }
`

export default IndexPage
