import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import fetchRequest from '../../utlis'
import { Button, Form, Input, Upload, List } from 'antd';
import { InboxOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalWithForm from '../Modal';

export default function Quiz () {
  const navigate = useNavigate();
  // get the id and quizeName from the url
  const { id, quizName } = useParams()
  const [questions, setQuestions] = React.useState([]);
  const [newQuizName, setNewQuizName] = React.useState(quizName);
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // init Questions we have
  useEffect(() => {
    fetchRequest(`quiz/${id}`, 'GET', null).then((data) => {
      console.log('quiz back is', data);
      setQuestions(data.questions)
    })
  }, [])
  // to post a requet to uplad a question.
  function postQuestion (modalInfo) {
    const payload = {
      question: modalInfo,
      name: quizName,
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    }
    console.log('I click OK', payload)
    fetchRequest(`quiz/${id}`, 'PUT', payload).then((data) => {
      console.log(' success !!! quiz back is', data);
    })
    setQuestions([...questions, modalInfo])
  }
  // handle edit the whole quiz
  function handleEditQuiz (event) {
    event.preventDefault();
    const payload = {
      questions,
      name: quizName,
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    }
    console.log('I click submit quiz', payload)
  }
  return (
    <>
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
          <Form.Item label="Quize thumbnail">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="" customRequest={(e) => console.log('xxxxxxxx', e)}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <h2 style={{ marginBottom: '20px', textAlign: 'left' }}>Questions:</h2>
          <Button onClick={() => navigate(`/main/question/${id}`) }>Add Question</Button>
          <ModalWithForm style={{ marginBottom: '50px' }} postQuestion ={postQuestion} quizName = {quizName} />
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
            footer={
              <div>
              </div>
            }
            renderItem={(questions) => (
              <List.Item
                key={questions.title}
              >
                <List.Item.Meta
                  title={<a>{questions.name}</a>}
                />
                <>Question: {questions.questionDescription} </><br></br>
                <>Time to complete : {questions.questionTileAllowed}s</>
                <Button onClick={() => console.log(`I wanna delete ${questions.id}`)} type="dashed" danger style={{ position: 'absolute', right: '120px', height: '32px', textTransform: 'capitalize' }}> <DeleteOutlined /> Delete Quiz</Button>
                  <Button style={{ position: 'absolute', right: '0px', textTransform: 'capitalize' }}><FormOutlined />Edit Quiz</Button>
              </List.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '30px' }} onClick={handleEditQuiz} >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
