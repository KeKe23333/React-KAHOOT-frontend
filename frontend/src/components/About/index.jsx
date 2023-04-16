import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetchRequest from '../../utlis'
import { Button, Form, Input, Upload, List } from 'antd';
import { InboxOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalWithForm from '../Modal';

export default function About () {
  // get the id from the url
  const { id } = useParams()
  const [questions, setQuestions] = React.useState([]);
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

  useEffect(() => {
    fetchRequest(`quiz/${id}`, 'GET', null).then((data) => {
      console.log('quiz back is', data);
      setQuestions(data.questions)
    })
  }, [])
  return (
    <>
      <div>
        <h1 style={{ fontSize: '30px', marginBottom: '30px', textAlign: 'left' }}>Quize name: {id}</h1>
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
            initialValue={id}
            rules={[
              {
                required: true,
                message: 'Please input your Quize name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Quize thumbnail">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <h2 style={{ marginBottom: '20px', textAlign: 'left' }}>Questions:</h2>
          <ModalWithForm style={{ marginBottom: '50px' }} />
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
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={<a>{questions.name}</a>}
                />
                <>0 Question</><br></br>
                <>Time to complete quiz: 10mins</>
                <div style={{ marginTop: '20px', position: 'relative', }}>
                  <Button onClick={() => console.log(`I wanna delete ${questions.id}`)} type="dashed" danger style={{ position: 'absolute', right: '120px', height: '32px', textTransform: 'capitalize' }}> <DeleteOutlined /> Delete Quiz</Button>
                  <Button style={{ position: 'absolute', right: '0px', textTransform: 'capitalize' }}><FormOutlined />Edit Quiz</Button>
                </div>
              </List.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '30px' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
