import React, { useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, Col } from 'antd';
function ModalWithForm () {
  const [open, setOpen] = useState(false);
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
                onOk={() => setOpen(false)}
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
                        <Input />
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Points Allowed"
                        name="Points Allowed"
                        // initialValue={id}
                        rules={[
                          {
                            required: true,
                            message: 'Points Allowed required',
                          },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 style={{ marginBottom: '20px', }}>Question Answer</h2>
                    <Form.Item
                        label="Question A"
                        name="Question A"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Question B"
                        name="Question B"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Question C"
                        name="Question C"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Question D"
                        name="Question D"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="Select coreect answer" label="Select coreect answer">
                        <Checkbox.Group>
                                <Col span={8}>
                                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                        A
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="B" style={{ lineHeight: '32px' }} >
                                        B
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                        C
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="D" style={{ lineHeight: '32px' }}>
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
export default ModalWithForm;
