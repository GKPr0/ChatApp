import React from 'react'
import { List, Segment } from 'semantic-ui-react'
import ChatListControl from './ChatListControl'
import ChatListItem from './ChatListItem'


export default function ChatList() {
  return (
    <Segment style={{display: "flex", flexFlow: "column", height: "100%" }}>
      <ChatListControl/>
      <List animated verticalAlign='middle' selection style={{height: "100%"}}>
        <ChatListItem />
        <ChatListItem />
      </List>
    </Segment>
  )
}
