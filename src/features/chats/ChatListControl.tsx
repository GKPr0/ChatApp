import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import GroupForm from './GroupForm'

export default function ChatListControl() {
  const { modalStore } = useStore();

  return (
    <Input type="text" placeholder='Find new people...' icon="user" action  fluid>
      <input />
      <Button type='submit' icon="user" color='blue' />
      <Button type='submit' icon="group" color='blue' onClick={() => modalStore.openModal(<GroupForm />)} />
    </Input>
  )
}
