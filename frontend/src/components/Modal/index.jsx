import React, { useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, Col } from 'antd';

export default function ModalWithForm (props) {
  const { postQuestion } = props
  const [open, setOpen] = useState(false);
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
  const [correctAnswer, setCorrectAnswer] = useState([0, 0, 0, 0]);
  return (
        <>
            <div style={{ textAlign: 'left', }}>
                <Button type="primary" onClick={() => setOpen(true)} style={{ backgroundColor: 'green', textTransform: 'capitalize' }}>
                    Add Question
                </Button>
            </div>
            <Modal
                centered
                open={open}
                onOk={() => {
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
                    correctAnswer,
                  }
                  postQuestion(modalInfo)
                  setOpen(false)
                }}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <h1>Add a  new Question</h1>
                <Form
                    name="basic"
                    style={{
                      marginTop: '20px',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        <Input value={questionPoints} onChange={(e) => setQuestionPoints(e.target.value)}/>
                    </Form.Item>
                    <div style={{ display: 'flex' }} ><h2 style={{ marginBottom: '20px', marginRight: '10px' }}>Question Answer</h2> <p style={{ marginTop: '10px' }}>( required at least 2 answers ) </p> </div>
                    <Form.Item
                        label="Question 1"
                        name="Question 1"
                    >
                        <Input value={answer1} onChange={(e) => asetAnswer1(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question 2"
                        name="Question 2"
                    >
                        <Input value={answer2} onChange={(e) => asetAnswer2(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question 3"
                        name="Question 3"
                    >
                        <Input value={answer3} onChange={(e) => asetAnswer3(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question 4"
                        name="Question 4"
                    >
                        <Input value={answer4} onChange={(e) => asetAnswer4(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question 5"
                        name="Question 5"
                    >
                        <Input value={answer5} onChange={(e) => asetAnswer5(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question 6"
                        name="Question 6"
                    >
                        <Input value={answer6} onChange={(e) => asetAnswer6(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name="Select coreect answer" label="Select coreect answer">
                        <Checkbox.Group
                            onChange={(e) => { setCorrectAnswer(e) }}>
                                <Col span={8}>
                                    <Checkbox value='1' style={{ lineHeight: '32px' }} >
                                        1
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='2' style={{ lineHeight: '32px' }} >
                                        2
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='3' style={{ lineHeight: '32px' }} >
                                        3
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='4' style={{ lineHeight: '32px' }} >
                                        4
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='5' style={{ lineHeight: '32px' }} >
                                        5
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='6' style={{ lineHeight: '32px' }} >
                                        6
                                    </Checkbox>
                                </Col>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
  );
}
