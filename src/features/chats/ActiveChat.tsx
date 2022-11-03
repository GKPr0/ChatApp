import React from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import ChatControl from './ChatControl'
import ChatMessage from './ChatMessage'

export default function ActiveChat() {
  return (
    <Segment style={{display: "flex", flexFlow: "column", height: "100%"}}>
        <Comment.Group style={{height: "100%"}}>
          <ChatMessage />
          <ChatMessage />
        </Comment.Group>

        <ChatControl />
    </Segment>
  )
}
