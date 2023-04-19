import React from 'react'
import { Button, Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../../components/Notification';
import fetchRequest from '../../utlis';

export default function PlayerIn () {
  const { sessionId } = useParams()
  const [playerName, setPlayerName] = React.useState('')
  const navigate = useNavigate()

  function handlePlayStartGame () {
    if (playerName === '') {
      Notification({ message: 'Please input your name to start the game!' });
      return
    }
    console.log('start game, player name is ', playerName)
    const payload = {
      name: playerName,
    }
    console.log('payload is ', payload)
    fetchRequest(`play/join/${sessionId}`, 'POST', payload).then((data) => {
      '/play/join/:sessionId/player/:playerId'
      navigate(`/play/join/${sessionId}/player/${data.playerId}/name/${playerName}`)
    })
  }
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
        <Input value={playerName} onChange={ (e) => setPlayerName(e.target.value) } />
      </Form.Item>

      <Form.Item>
            <Button onClick={() => handlePlayStartGame() }type="primary" style={{ width: '100%', marginTop: '30px' }} >
              Start Game!
            </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
