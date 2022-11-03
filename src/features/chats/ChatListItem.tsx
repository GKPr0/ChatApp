import React from 'react'
import { Image, List } from 'semantic-ui-react'

export default function ChatListItem() {
  return (
    <List.Item>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
      <List.Content>
        <List.Header>Helen</List.Header>
      </List.Content>
    </List.Item>
  )
}
