import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import fetchRequest from '../../utlis'
import { Button, Form, Input, List } from 'antd';
import { FormOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'; // https://www.npmjs.com/package/nanoid
import Notification from '../Notification';

export default function Quiz () {
  const navigate = useNavigate();
  // get the quizId and quizeName from the url
  const { quizId, quizName } = useParams()
  const [questions, setQuestions] = React.useState([]);
  const [newQuizName, setNewQuizName] = React.useState(quizName);
  const [quizThumbnail, setQuizThumbnail] = React.useState('');
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // init Questions we have
  useEffect(() => {
    fetchRequest(`admin/quiz/${quizId}`, 'GET', null).then((data) => {
      console.log('fetch back is ', data)
      setQuestions(data.questions)
      setQuizThumbnail(data.thumbnail)
    })
  }, [])
  // handle edit the whole quiz
  function handleEditQuiz (event) {
    event.preventDefault();
    const payload = {
      questions,
      name: quizName,
      thumbnail: quizThumbnail,
    }
    fetchRequest(`admin/quiz/${quizId}`, 'PUT', payload).then((data) => {
      Notification({ message: 'Quiz Change successful!' });
    })
  }
  // handle delete a question
  function handleDeleteQuestion (questionId) {
    const newQuestions = questions.filter((question) => question.questionId !== questionId)
    setQuestions(newQuestions)
  }
  //  ================================ render ================================
  return (
    <>
      <div style={{ display: 'block', position: 'relative', marginBottom: '50px' }} >
      <Button style={{ position: 'absolute', left: '0px', minWidth: '100px' }} onClick={() => navigate(-1)}>Back <RollbackOutlined /> </Button>
      </div>
      <div>
        <h1 style={{ fontSize: '30px', marginBottom: '30px', textAlign: 'left' }}>Quize name: {quizName}</h1>
        <Form
          name="basic"
          style={{
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Quize name"
            name="Quize name"
            initialValue={quizName}
            rules={[
              {
                required: true,
                message: 'Please input your Quize name!',
              },
            ]}
          >
            <Input value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)} />
          </Form.Item>
          <Form.Item
          label="Quize thumbnail URL"
          >
            <Input value={quizThumbnail} onChange={(e) => setQuizThumbnail(e.target.value)} />
          </Form.Item>
          <h2 style={{ marginBottom: '20px', textAlign: 'left' }}>Questions:</h2>
          <Button onClick={() => navigate(`/main/question/${quizId}/${nanoid()}`) }>Add Question</Button>
          {/* List here */}
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={questions}
            renderItem={(questions) => (
              <List.Item
                key={questions.title}
              >
                <List.Item.Meta
                  title={<a>{questions.name}</a>}
                />
                <>Question: {questions.questionDescription} </><br></br>
                <>Time to complete : {questions.questionTimeAllowed}s</>
                <Button onClick={() => handleDeleteQuestion(questions.questionId)} type="dashed" danger style={{ position: 'absolute', right: '120px', height: '32px', textTransform: 'capitalize' }}> <DeleteOutlined /> Delete Quiz</Button>
                <Button onClick={() => navigate(`/main/question/${quizId}/${questions.questionId}`) } style={{ position: 'absolute', right: '0px', textTransform: 'capitalize' }}><FormOutlined />Edit Quiz</Button>
              </List.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '30px' }} onClick={handleEditQuiz} >
              Submit Change
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
