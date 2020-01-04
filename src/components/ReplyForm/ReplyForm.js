import React, { useState } from "react"
import styled from 'styled-components';

const ReplyWrapper = styled.div`
  margin: 2px 0;
  overflow: hidden;
  transition: all .3s ease-in-out;
  font-size: 0.8em;
`;

const ContentInput = styled.textarea`
  background-color: white;
  border: 2px solid ${({ error }) => error ? 'red' : 'black' };
  width: 100%;
  outline: none;
  padding: 2px;
  resize: none;
`

const NameInput = styled.input`
  background-color: white;
  border: 2px solid ${({ error }) => error ? 'red' : 'black' };
  max-width: 400px;
  width: 100%;
  outline: none;
  padding: 2px;
`

const SendCommentButton = styled.button`
  background: white;
  outline: none;
  padding: 2px;
  border: 2px solid black;
  cursor: pointer;
  transition: color 0.3s ease-in-out, background 0.3s ease-in-out;
  margin-left: 2px;
  color: black;

  &:hover {
    background: black;
    color: white;
  }
`

const AuthorSendWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ReplyForm = ({ sendReply, replyName }) => {
  const [contentValue, setContentValue] = useState(`@${replyName} `)
  const [contentError, setContentError] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [nameError, setNameError] = useState(false)

  const onFieldChange = e => {
    if (e.target.name === "content") {
      setContentValue(e.target.value)
    } else if (e.target.name === "name") {
      setNameValue(e.target.value)
    }
  }

  const onSubmit = () => {
    let errors = false
    setContentError('')
    setNameError('');
    if (nameValue.length < 2) {
      errors = true
      setNameError(true)
    }
    if (contentValue.length < 5) {
      errors = true
      setContentError(true)
    }
    if (!errors) {
      sendReply({ name: nameValue, content: contentValue })
      setContentValue('');
      setNameValue('');
    }
  }

  return (
    <ReplyWrapper>
      <ContentInput placeholder="Reply to comment..." rows={2} onChange={onFieldChange} name="content" value={contentValue} error={contentError} />
      <AuthorSendWrapper>
        <NameInput placeholder="Your name" onChange={onFieldChange} name="name" value={nameValue} error={nameError} />
        <SendCommentButton onClick={onSubmit}>Send</SendCommentButton>
      </AuthorSendWrapper>
    </ReplyWrapper>
  )
}

export default ReplyForm;
