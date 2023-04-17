import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Checkbox, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import fetchRequest from '../../utlis'
import Notification from '../Notification';

export default function Question () {
  const navigate = useNavigate()
  const { quizId, questionId } = useParams()
  const [quizName, setQuizName] = useState('');
  const [quizThumbnail, setQuizThumbnail] = useState('');
  const [oldQuestions, setOldQuestions] = useState([]);
  const [newQuiz, setNewQuiz] = useState([]);
  // get the quiz info
  useEffect(() => {
    fetchRequest(`quiz/${quizId}`, 'GET', null).then((data) => {
      console.log('fetch back is ', data)
      setOldQuestions(data.questions)
      setQuizName(data.name)
      setQuizThumbnail(data.thumbnail)
    })
  }, [])

  // modal info here
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionTimeAllowed, setquestionTimeAllowed] = useState('');
  const [questionPoints, setQuestionPoints] = useState('');
  const [answer1, asetAnswer1] = useState(false);
  const [answer2, asetAnswer2] = useState(false);
  const [answer3, asetAnswer3] = useState(false);
  const [answer4, asetAnswer4] = useState(false);
  const [answer5, asetAnswer5] = useState(false);
  const [answer6, asetAnswer6] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState('');

  function handleSubmitQuestion () {
    const modalInfo = {
      questionDescription,
      questionTimeAllowed,
      questionPoints,
      answers: [
        answer1,
        answer2,
        answer3,
        answer4,
        answer5,
        answer6,
      ],
      correctAnswers,
      questionId,
    }
    setNewQuiz([...oldQuestions, modalInfo])
    // fetchRequest(`quiz/${quizId}`, 'POST', modalInfo).then((data) => {
    //   console.log('fetch back is ', data)
    // })
  }

  useEffect(() => {
    if (newQuiz.length === oldQuestions.length + 1) {
      const payload = {
        questions: newQuiz,
        name: quizName,
        thumbnail: quizThumbnail,
      }
      fetchRequest(`quiz/${quizId}`, 'PUT', payload).then((data) => {
        navigate(`/main/quiz/${quizId}/${quizName}`)
        Notification({ message: 'Create Question successfully!' });
      })
    }
  }, [newQuiz])
  return (
    <>
      <div style={{ textAlign: 'left', }}>
      <div style={{ display: 'flex' }} ><h2 style={{ marginBottom: '20px', marginRight: '10px' }}>Add a new question id {quizId} </h2> </div>
      <Form
        name="basic"
        style={{
          marginTop: '20px',
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Question Description"
          name="Question Description"
          // initialValue={id}
          rules={[
            {
              required: true,
              message: 'Please input your Question Description',
            },
          ]}
        >
          <Input value={questionDescription} onChange={(e) => setQuestionDescription(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question Time allowed"
          name="Question Time allowed"
          // initialValue={id}
          rules={[
            {
              required: true,
              message: 'Question Time allowed',
            },
          ]}
        >
          <Input value={questionTimeAllowed} onChange={(e) => setquestionTimeAllowed(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question Points"
          name="Question Points"
          // initialValue={id}
          rules={[
            {
              required: true,
              message: 'Points Allowed required',
            },
          ]}
        >
          <Input value={questionPoints} onChange={(e) => setQuestionPoints(e.target.value)} />
        </Form.Item>
        <div style={{ display: 'flex' }} ><h2 style={{ marginBottom: '20px', marginRight: '10px' }}>Question Answer</h2> <p style={{ marginTop: '10px' }}>( required at least 2 answers ) </p> </div>
        <Form.Item
          label="Question 1"
          name="Question 1"
        >
          <Input value={answer1} onChange={(e) => asetAnswer1(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question 2"
          name="Question 2"
        >
          <Input value={answer2} onChange={(e) => asetAnswer2(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question 3"
          name="Question 3"
        >
          <Input value={answer3} onChange={(e) => asetAnswer3(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question 4"
          name="Question 4"
        >
          <Input value={answer4} onChange={(e) => asetAnswer4(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question 5"
          name="Question 5"
        >
          <Input value={answer5} onChange={(e) => asetAnswer5(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Question 6"
          name="Question 6"
        >
          <Input value={answer6} onChange={(e) => asetAnswer6(e.target.value)} />
        </Form.Item>
        <Form.Item name="Select coreect answer" label="Select coreect answer" >
          <Checkbox.Group
            onChange={(e) => { setCorrectAnswers(e) }}
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
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '30px' }} onClick={handleSubmitQuestion} >
              Submit
            </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  )
}
