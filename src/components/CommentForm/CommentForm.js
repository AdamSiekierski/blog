import React, { useState } from "react"
import styled from "styled-components"

const ContentInput = styled.textarea`
  background-color: white;
  border: 3px solid ${({ error }) => error ? 'red' : 'black' };
  width: 100%;
  outline: none;
  padding: 5px;
  resize: none;
`

const NameInput = styled.input`
  background-color: white;
  border: 3px solid ${({ error }) => error ? 'red' : 'black' };
  max-width: 400px;
  width: 100%;
  outline: none;
  padding: 5px;
`

const SendCommentButton = styled.button`
  background: white;
  outline: none;
  padding: 5px;
  border: 3px solid black;
  cursor: pointer;
  transition: color 0.3s ease-in-out, background 0.3s ease-in-out;
  margin-left: 5px;

  &:hover {
    background: black;
    color: white;
  }
`

const AuthorSendWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const CommentForm = ({ sendComment }) => {
  const [contentValue, setContentValue] = useState("")
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
      sendComment({ name: nameValue, content: contentValue })
      setContentValue('');
      setNameValue('');
    }
  }

  return (
    <div>
      <ContentInput
        placeholder="Share your thoughts..."
        rows={4}
        name="content"
        value={contentValue}
        onChange={onFieldChange}
        error={contentError}
      />
      <AuthorSendWrapper>
        <NameInput
          placeholder="Your name"
          name="name"
          value={nameValue}
          onChange={onFieldChange}
          error={nameError}
        />
        <SendCommentButton onClick={onSubmit}>Send</SendCommentButton>
      </AuthorSendWrapper>
    </div>
  )
}

export default CommentForm
