import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"

const PostWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto 0 auto;
  background-color: black;
  padding: 20px;
  color: white;
  border: 5px solid white;
`

const PostTitle = styled.h3`
  font-size: 36px;
  margin: 0;
  font-weight: 700;
`

const PostDate = styled.h4`
  font-size: 20px;
  color: #aaaaaa;
`

const BlogPage = ({ data }) => {
  const { markdownRemark } = data

  return (
    <Layout>
      <PostWrapper>
        <PostTitle>{markdownRemark.frontmatter.title}</PostTitle>
        <PostDate>{markdownRemark.frontmatter.date}</PostDate>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
      </PostWrapper>
    </Layout>
  )
}

export const PageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

export default BlogPage
