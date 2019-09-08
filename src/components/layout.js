import React from "react"
import Typing from "react-typing-animation"
import styled from "styled-components"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import "./layout.css"

import favicon16 from "../assets/favicon/favicon-16x16.png"
import favicon32 from "../assets/favicon/favicon-32x32.png"
import favicon96 from "../assets/favicon/favicon-96x96.png"

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  padding: 0 25px 25px 25px;
`

const Header = styled.div`
  height: 100px;
  width: 100%;
  padding: 0 35px 0 25px;
  font-size: 30px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    font-size: 24px;
    padding: 0 10px 0 5px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const Layout = ({ children }) => (
  <StyledWrapper>
    <Helmet
      meta={[
        {
          name: "description",
          content: "adam siekierski's programming blog",
        },
        {
          name: "keywords",
          content: "frontend, developer",
        },
        {
          name: "author",
          content: "Adam Siekierski",
        },
      ]}
      link={[
        { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16 },
        { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32 },
        { rel: "icon", type: "image/png", sizes: "96x96", href: favicon96 },
      ]}
    />
    <Header>
      <Typing speed={100} cursorClassName={"customCursor"}>
        <StyledLink to="/">adam siekierski's blog</StyledLink>
      </Typing>
    </Header>
    <div>{children}</div>
  </StyledWrapper>
)

export default Layout
