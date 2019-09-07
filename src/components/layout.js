import React from "react"
import Typing from "react-typing-animation"
import styled from "styled-components"
import { Link } from "gatsby"
import "./layout.css"

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
    padding: 0 20px 0 10px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const Layout = ({ children }) => (
  <StyledWrapper>
    <Header>
      <Typing speed={100} cursorClassName={"customCursor"}>
        <StyledLink to="/">adam siekierski's blog</StyledLink>
      </Typing>
    </Header>
    <div>{children}</div>
  </StyledWrapper>
)

export default Layout
