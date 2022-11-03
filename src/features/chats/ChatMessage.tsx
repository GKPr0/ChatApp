import React from 'react'
import { Comment} from 'semantic-ui-react'

export default function ChatMessage() {
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
      <Comment.Content>
        <Comment.Author as='a'>User Name</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}
