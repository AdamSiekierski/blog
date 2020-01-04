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
      <Layout>
        {data.allMarkdownRemark.edges.map(item => {
          return <MainPagePost post={item.node} key={item.node.id} />
        })}
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 350)
          id
          frontmatter {
            date
            title
            path
          }
        }
      }
    }
  }
`

export default IndexPage
