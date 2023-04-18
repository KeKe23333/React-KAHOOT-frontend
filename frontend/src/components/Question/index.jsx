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

  // modal info here
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionTimeAllowed, setquestionTimeAllowed] = useState('');
  const [questionPoints, setQuestionPoints] = useState('');
  const [answer1, setAnswer1] = useState(false);
  const [answer2, setAnswer2] = useState(false);
  const [answer3, setAnswer3] = useState(false);
  const [answer4, setAnswer4] = useState(false);
  const [answer5, setAnswer5] = useState(false);
  const [answer6, setAnswer6] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState('');

  // get the quiz info and check if it is a edit or create
  useEffect(() => {
    fetchRequest(`quiz/${quizId}`, 'GET', null).then((data) => {
      console.log('fetch back is ', data)
      const removeSameId = data.questions.filter(question => question.questionId !== questionId)
      console.log('myquestion is ', removeSameId)
      setOldQuestions(removeSameId)
      setQuizName(data.name)
      setQuizThumbnail(data.thumbnail)
    })
  }, [])

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
    // check how many answer we have
    const answers = [answer1, answer2, answer3, answer4, answer5, answer6,]
    const numOfAnswer = answers.filter(answer => answer).length
    console.log('numOfAnswer is ', numOfAnswer)
    if (newQuiz.length === oldQuestions.length + 1 && questionDescription !== '' && questionTimeAllowed !== '' && questionPoints !== '') {
      if (numOfAnswer < 2) {
        Notification({ message: 'Please input at least 2 answers' });
      } else if (correctAnswers === '') {
        Notification({ message: 'Please input at least 1 correct answer' });
      } else {
        const payload = {
          questions: newQuiz,
          name: quizName,
          thumbnail: quizThumbnail,
        }
        fetchRequest(`quiz/${quizId}`, 'PUT', payload).then((data) => {
          navigate(`/main/quiz/${quizId}/${quizName}`)
          Notification({ message: 'Create Questionc successfully!' });
        })
      }
    }
  }, [newQuiz])
  return (
    <>
      <div style={{ textAlign: 'left', }}>
        <div style={{ display: 'flex' }} ><h2 style={{ marginBottom: '20px', marginRight: '10px' }}>Add a new question for Quiz: {quizName} </h2> </div>
        <Form
          name="basic"
          style={{
            marginTop: '20px',
          }}
          autoComplete="off"
          // initialValues={{ QuestionDescription: 'xxx' }}
        >
          <Form.Item
            label="Question Description"
            name="QuestionDescription"
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
            label="Question Time allowed (seconds)"
            name="Question Time allowed (seconds)"
            rules={[
              {
                required: true,
                message: 'Pleast input Question Time allowed',
              },
            ]}
          >
            <Input value={questionTimeAllowed} onChange={(e) => setquestionTimeAllowed(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Question Points"
            name="Question Points"
            rules={[
              {
                required: true,
                message: 'Pleast input Points Allowed required',
              },
            ]}
          >
            <Input value={questionPoints} onChange={(e) => setQuestionPoints(e.target.value)} />
          </Form.Item>
          <div style={{ display: 'flex' }} ><h2 style={{ marginBottom: '20px', marginRight: '10px' }}>Question Answer</h2> <p style={{ marginTop: '10px' }}>( required at least 2 answers ) </p> </div>
          <Form.Item
            label="Answer 1"
            name="Answer 1"
          >
            <Input value={answer1} onChange={(e) => setAnswer1(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Answer 2"
            name="Answer 2"
          >
            <Input value={answer2} onChange={(e) => setAnswer2(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Answer 3"
            name="Answer 3"
          >
            <Input value={answer3} onChange={(e) => setAnswer3(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Answer 4"
            name="Answer 4"
          >
            <Input value={answer4} onChange={(e) => setAnswer4(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Answer 5"
            name="Answer5"
          >
            <Input value={answer5} onChange={(e) => setAnswer5(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Answer 6"
            name="Answer 6"
          >
            <Input value={answer6} onChange={(e) => setAnswer6(e.target.value)} />
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
