import React from 'react'
import { Button, Input } from 'semantic-ui-react'


export default function ChatControl() {
  return (
    <Input type="text" placeholder='New message...' action >
      <input />
      <Button type='submit' icon="send" color='blue' />
    </Input>
  )
}
