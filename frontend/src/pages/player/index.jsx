import React from 'react'
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';

export default function PlayerIn () {
  const { sessionId } = useParams()
  console.log('my session id is ', sessionId)
  return (
    <div style={{
      display: 'inline-block',
      height: '100%',
      marginLeft: '30%',
      marginTop: '10%',
      justifyContent: 'center',
    }}>
      <h1 style={{ marginBottom: '15%' }} >Please input your name to start the Game !!</h1>
    <Form>
      <Form.Item
        label="SessionId"
        name="sessionId"
        initialValue= { sessionId }
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"

      >
        <Input />
      </Form.Item>

      <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '30px' }} >
              Start Game!
            </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
