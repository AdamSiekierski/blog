import React, { useState } from "react"
import styled from "styled-components"
import moment from "moment"
import ReplyForm from "../ReplyForm/ReplyForm"
import axios from "axios"

const CommentHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 0;

  .commentDate {
    font-size: 15px;
    color: #666;
  }
`

const CommentWrapper = styled.div`
  margin: 5px 0;
  border-top: 3px solid black;
  padding: 5px;
`

const ReplyButton = styled.button`
  margin: 3px 0;
  background: ${({ isActive }) => isActive ? 'black' : 'white'};
  outline: none;
  border: 2px solid black;
  font-size: 15px;
  color: ${({ isActive }) => isActive ? 'white' : 'black'};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  padding: 0 3px;

  &:hover {
    color: white;
    background-color: black;
  }
`

const Reply = styled.div`
  padding: 5px 5px 5px 10%;

  .replyHeader {
    font-weight: bold;
  }

  .replyDate {
    font-size: 15px;
    color: #666;
  }
`

const Comment = ({ comment, refreshComments }) => {
  const [isReplyActive, setReplyActive] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState('');
  const [replyName, setReplyName] = useState('');

  const openReply = (name, id) => {
    if (isReplyActive) {
      setReplyActive(false);
      setActiveReplyId('')
      setReplyName('')
    } else {
      setReplyActive(true);
      setActiveReplyId(id)
      setReplyName(name)
    }
  }

  const sendReply = ({ name, content }) => {
    setReplyActive(false);
    setActiveReplyId('')
    setReplyName('')

    axios.post(`https://adamsiekierski-blog.herokuapp.com/comments/add`, {
      reply_to: comment._id,
      content: content,
      author: name,
    }).then(() => {
      refreshComments();
    })
  }

  return (
    <CommentWrapper>
      <CommentHeader>
        {comment.author}
        <span className="commentDate">
          {" "}
          {moment(comment.date).format("DD/MM/YYYY")}
        </span>
      </CommentHeader>
      <div>{comment.content}</div>
      <ReplyButton isActive={activeReplyId === comment._id} onClick={() => openReply(comment.author, comment._id)}>Reply</ReplyButton>
      {comment.replies.map(reply => (
        <Reply key={reply._id}>
          <div className="replyHeader">
            {reply.author}{" "}
            <span className="replyDate">
              {moment(reply.date).format("DD/MM/YYYY")}
            </span>
          </div>
          <div>
            {
              reply.content
            }
          </div>
          <ReplyButton isActive={activeReplyId === reply._id} onClick={() => openReply(reply.author, reply._id)}>Reply</ReplyButton>
        </Reply>
      ))}
      {isReplyActive && <ReplyForm replyName={replyName} sendReply={sendReply} />}
    </CommentWrapper>
  )
};

export default Comment
