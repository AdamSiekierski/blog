import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const PostPrevievContainer = styled.div`
  max-width: 800px;
  margin: 25px auto 0 auto;
  padding: 25px;
  border: 5px solid #ffffff;
`

const PostTitle = styled.h3`
  font-size: 30px;
  margin: 0;

  a {
    color: #ffffff;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`

const PostDate = styled.h4`
  font-size: 20px;
  color: #bbbbbb;
`

const SeeMoreLink = styled(Link)`
  color: white;
`

const MainPagePost = ({ post }) => (
  <PostPrevievContainer>
    <PostTitle>
      <Link to={post.frontmatter.path}> {post.frontmatter.title} </Link>
    </PostTitle>
    <PostDate> {post.frontmatter.date} </PostDate>
    {post.excerpt}{" "}
    <SeeMoreLink to={post.frontmatter.path}>see more</SeeMoreLink>
  </PostPrevievContainer>
)

export default MainPagePost
