import React from 'react'
import { Grid } from 'semantic-ui-react'
import ActiveChat from './ActiveChat'
import ChatList from './ChatList'

export default function ChatDashboard() {
  return (
    <Grid style={{height: "100vh"}} stackable>  
      <Grid.Column width={4}>
        <ChatList/>
      </Grid.Column>
      <Grid.Column width={12}>
        <ActiveChat/>
      </Grid.Column>
    </Grid>
  )
}
