import React, { useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, Col } from 'antd';

export default function ModalWithForm (props) {
  const [open, setOpen] = useState(false);
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // modal info here
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionTileAllowed, setQuestionTileAllowed] = useState('');
  const [questionPoints, setQuestionPoints] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
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
                  console.log('I click OK', props.testvalue, questionDescription, questionTileAllowed, questionPoints, answerA, answerB, answerC, answerD, correctAnswer)
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
                        <Input value={questionTileAllowed} onChange={(e) => setQuestionTileAllowed(e.target.value)} />
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
                    <h2 style={{ marginBottom: '20px', }}>Question Answer</h2>
                    <Form.Item
                        label="Question A"
                        name="Question A"
                    >
                        <Input value={answerA} onChange={(e) => setAnswerA(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question B"
                        name="Question B"
                    >
                        <Input value={answerB} onChange={(e) => setAnswerB(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question C"
                        name="Question C"
                    >
                        <Input value={answerC} onChange={(e) => setAnswerC(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Question D"
                        name="Question D"
                    >
                        <Input value={answerD} onChange={(e) => setAnswerD(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name="Select coreect answer" label="Select coreect answer">
                        <Checkbox.Group
                            onChange={(e) => { setCorrectAnswer(e) }}>
                                <Col span={8}>
                                    <Checkbox value='A' style={{ lineHeight: '32px' }} >
                                        A
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='B' style={{ lineHeight: '32px' }} >
                                        B
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='C' style={{ lineHeight: '32px' }} >
                                        C
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value='D' style={{ lineHeight: '32px' }} >
                                        D
                                    </Checkbox>
                                </Col>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
  );
}
