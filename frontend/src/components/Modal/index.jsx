import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export default function ModalStart (props) {
  const { quizId } = props
  const [open, setOpen] = useState(false);

  // modal info here
  return (
        <>
            <div style={{ textAlign: 'left', }}>
                <Button type="primary" onClick={() => setOpen(true)} style={{ backgroundColor: 'green', textTransform: 'capitalize' }}>
                    Start a game {quizId}
                </Button>
            </div>
            <Modal
                centered
                open={open}
                onOk={() => {
                  setOpen(false)
                }}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <h1>Your session ID is : {quizId}</h1>
            </Modal>
        </>
  );
}
