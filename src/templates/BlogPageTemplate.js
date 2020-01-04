import React from "react"
import { graphql } from "gatsby"
import axios from "axios";
import md5 from "md5";
import styled from "styled-components"
import Layout from "../components/Layout/Layout"
import Comment from "../components/Comment/Comment"
import CommentForm from "../components/CommentForm/CommentForm"

const PostWrapper = styled.article`
  max-width: 900px;
  margin: 0 auto 0 auto;
  background-color: black;
  padding: 20px;
  color: white;
  border: 5px solid white;

  @media screen and (max-width: 600px) {
    font-size: 0.8em;
    padding: 10px;
  }

  a {
    color: white;
  }

  blockquote {
    font-style: italic;
  }
`

const PostTitle = styled.h3`
  font-size: 36px;
  margin: 0;
  font-weight: 700;

  @media screen and (max-width: 600px) {
    font-size: 30px;
  }
`

const PostDate = styled.h4`
  font-size: 20px;
  color: #aaaaaa;
`

const CommentsWrapper = styled.div`
  max-width: 900px;
  margin: 10px auto 10px auto;
  background-color: white;
  padding: 25px;
  color: black;

  @media screen and (max-width: 600px) {
    font-size: 0.8em;
    padding: 10px;
  }

  a {
    color: black;
  }

  blockquote {
    font-style: italic;
  }
`

class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }

    this.getComments = this.getComments.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    axios.get(`https://adamsiekierski-blog.herokuapp.com/comments/${md5(this.props.data.markdownRemark.frontmatter.path)}`).then(res => {
      this.setState({ comments: res.data });
    })
  }

  sendComment({ name, content }) {
    axios.post(`https://adamsiekierski-blog.herokuapp.com/comments/add`, {
      post_id: md5(this.props.data.markdownRemark.frontmatter.path),
      content: content,
      author: name,
    }).then(() => {
      this.getComments();
    })
  }

  render() {
    const { markdownRemark } = this.props.data

    return (
      <Layout>
        <PostWrapper>
          <PostTitle>{markdownRemark.frontmatter.title}</PostTitle>
          <PostDate>{markdownRemark.frontmatter.date}</PostDate>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </PostWrapper>
        <CommentsWrapper>
          <h1>Comments</h1>
          <CommentForm sendComment={this.sendComment} />
          { this.state.comments.map(comment => (
            <Comment comment={comment} key={comment._id} refreshComments={this.getComments}/>
          )).reverse() }
        </CommentsWrapper>
      </Layout>
    )
  }
}

export const PageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
        path
      }
    }
  }
`

export default BlogPage
