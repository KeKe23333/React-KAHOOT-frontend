import React from 'react'
import { Button, Form, Checkbox, Col } from 'antd';
import { useParams } from 'react-router-dom';

export default function PlayerHome () {
  const { sessionId, playerId, playerName } = useParams()
  function handlePlayStartGame () {
    console.log('xxxxxxxxx', sessionId, playerId, playerName)
  }
  return (
    <div style={{
      display: 'inline-block',
      height: '100%',
      marginLeft: '30%',
      marginTop: '10%',
      justifyContent: 'center',
    }}>
      <h3 >Name: {playerName}</h3>
      <h3 style={{ marginBottom: '15%' }} >Game session ID: {sessionId}</h3>
      <h1 style={{ marginBottom: '5%' }} >Question: </h1>
      <h3 style={{ marginBottom: '5%' }} >Questions place here</h3>
    <Form>
    <Form.Item name="Select coreect answer" label="Select coreect answer" >
            <Checkbox.Group
              // onChange={(e) => { setCorrectAnswers(e) }}
              style={{ marginLeft: '20px', marginTop: '5px' }}
            >
              <Col span={8}>
                <Checkbox value='1' >
                  1
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='2' >
                  2
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='3' >
                  3
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='4' >
                  4
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='5' >
                  5
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='6' >
                  6
                </Checkbox>
              </Col>
            </Checkbox.Group>
          </Form.Item>
      <Form.Item>
            <Button onClick={() => handlePlayStartGame() }type="primary" style={{ width: '100%', marginTop: '30px' }} >
              Next Question
            </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
