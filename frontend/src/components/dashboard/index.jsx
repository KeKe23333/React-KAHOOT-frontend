import { List, Button, Input, Space, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import fetchRequest from '../../utlis';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import { FormOutlined, DeleteOutlined, StopOutlined, CaretRightOutlined, CopyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
export default function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);
  const [showCreateGame, setShowCreateGame] = React.useState(false);
  const [newGameName, setNewGameName] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [stage, setStage] = React.useState('--');
  const navigate = useNavigate();
  // init page
  /* Also fetch each quiz id to get the length of the question */
  function caculateTimeAllocated (questions) {
    let timeAllocated = 0;
    questions.forEach((question) => {
      timeAllocated += Number(question.questionTimeAllowed);
    })
    return timeAllocated;
  }
  useEffect(() => {
    fetchRequest('admin/quiz', 'GET', null).then((data) => {
      console.log('quiz list is ', data);
      data.quizzes.forEach((quiz) => {
        fetchRequest(`admin/quiz/${quiz.id}`, 'GET', null).then((quizData) => {
          // get the length of the question and caculate the total time allocated
          const quizWithQuestionLength = { ...quiz, questionLength: quizData.questions.length, quizTimeAllocated: caculateTimeAllocated(quizData.questions) };
          setQuizzes((prev) => [...prev, quizWithQuestionLength]);
        })
      })
    });
  }, [])
  // Handle a new game creation
  function handleCreateGame () {
    if (newGameName === '') {
      alert('Game name cannot be empty!');
      return;
    }
    const payload = {
      name: newGameName,
    }
    fetchRequest('admin/quiz/new', 'POST', payload).then(() => {
      setNewGameName('');
      setShowCreateGame(false);
      // refresh the game list
      fetchRequest('admin/quiz', 'GET', null).then((data) => {
        setQuizzes(data.quizzes);
        Notification({ message: 'Create game successful!' });
      });
    });
  }
  // delete a game
  function handleDeleteGame (id) {
    fetchRequest(`admin/quiz/${id}`, 'DELETE', null).then(() => {
      // refresh the game list
      fetchRequest('admin/quiz', 'GET', null).then((data) => {
        setQuizzes(data.quizzes);
        Notification({ message: 'Delete game successful!' });
      });
    });
  }

  // ============================================Play A Game============================================
  // start a game
  function handleStartGame (quizId) {
    fetchRequest(`admin/quiz/${quizId}/start`, 'POST', null).then(() => {
      // to featch the quiz detail to get the sessions id.
      fetchRequest(`admin/quiz/${quizId}`, 'GET', null).then((quizDetail) => {
        console.log('After start a game , game detial is ', quizDetail);
        if (quizDetail.active === null) {
          Notification({ message: 'Start game failed!', type: 'error' });
          return;
        }
        Notification({ message: 'Start game successful!' });
        navigate('/main')
      })
    })
  }
  // end a game
  function handleEndGame (quizId) {
    fetchRequest(`admin/quiz/${quizId}/end`, 'POST', null).then(() => {
      Notification({ message: 'End game successful!' });
      navigate('/main')
    })
  }
  // copy game link button function
  function handleCopyGameLink () {
    if (copied) {
      setCopied(true);
    }
    Notification({ message: 'Copy game link successful!' });
  }
  // Go to next question to a game session
  function handleNextQuestion (quizId) {
    fetchRequest(`admin/quiz/${quizId}/advance`, 'POST', null).then((data) => {
      console.log('data is ', data);
      if (data.stage === 0) {
        setStage('Stand by')
        return;
      } else if (data.error) {
        setStage('Game Ended')
        return;
      }
      setStage(data.stage);
      // if (data) {
      //   Notification({ message: 'Next question success!' });
      // } else {
      //   Notification({ message: 'Next question failed!', type: 'error' });
      // }
    })
  }
  // ============================================Page Element============================================
  return (
  <>
  <Button block onClick={() => setShowCreateGame(!showCreateGame)}>+ Add a Game!</Button>
  {showCreateGame && (
    <>
    <Space.Compact style={{ width: '100%', marginTop: '10px' }}>
      <Input placeholder="Input new game name to create a game!" value={newGameName} onChange={(e) => setNewGameName(e.target.value)}/>
      <Button type="primary" onClick={handleCreateGame}>Submit</Button>
    </Space.Compact>
    </>)}
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
      },
      pageSize: 4,
    }}
    dataSource={quizzes}
    footer={
      <div>
      </div>
    }
    renderItem={(quizzes) => (
      <List.Item
        key={quizzes.title}
        extra={
          <img
            onClick={() => navigate(`/main/quiz/${quizzes.id}/${quizzes.name}`)}
            width={272}
            height={180}
            alt="logo"
            src={quizzes.thumbnail ? quizzes.thumbnail : 'https://img2.baidu.com/it/u=3286035947,2832928126&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501'}
            style={{ cursor: 'pointer', }}
          />
        }
      >

        <div style={{ marginTop: '20px', position: 'relative', }}>
          {!quizzes.active
            ? <Button onClick={() => handleStartGame(quizzes.id) } style={{ backgroundColor: '#009900', position: 'absolute', left: '10px', top: '20px', textTransform: 'capitalize' }} type="primary" ><CaretRightOutlined />Start The Game</Button>
            : <div>
              <p style={{ position: 'absolute', left: '13px', textTransform: 'capitalize' }} > Game ID {quizzes.active} started</p>
              <p style={{ position: 'absolute', left: '13px', top: '18px', textTransform: 'capitalize' }} > question: {stage} </p>
              <CopyToClipboard text= {`http://localhost:3000/play/join/${quizzes.active}`}
                onCopy={() => handleCopyGameLink()}>
                <Button style={{ position: 'absolute', left: '13px', top: '60px', textTransform: 'capitalize' }}><CopyOutlined />Copy Game Link</Button>
              </CopyToClipboard>
              <Button onClick={() => handleNextQuestion(quizzes.id) } style={{ position: 'absolute', left: '10px', top: '100px', textTransform: 'capitalize' }} type="primary"><ArrowRightOutlined />Next Question</Button>
              <Button onClick={() => handleEndGame(quizzes.id) } style={{ position: 'absolute', left: '10px', top: '140px', textTransform: 'capitalize' }} danger type="primary"><StopOutlined />End The Game</Button>
              </div> }
        </div>
        <List.Item.Meta
          title={<a onClick={() => navigate(`/main/quiz/${quizzes.id}/${quizzes.name}`)}>{quizzes.name}</a>}
        />
        <>{quizzes.questionLength} Question</><br></br>
        <>Time to complete quiz: {quizzes.quizTimeAllocated} seconds  </>
        <div style={{ marginTop: '20px', position: 'relative', }}>
          <Popconfirm
            title="Delete the QUiz"
            description="Are you sure to delete this Quiz?"
            onConfirm={() => handleDeleteGame(quizzes.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed" danger style={{ position: 'absolute', right: '120px', height: '32px', textTransform: 'capitalize' }}> <DeleteOutlined /> Delete Quiz</Button>
          </Popconfirm>
          <Button onClick={() => navigate(`/main/quiz/${quizzes.id}/${quizzes.name}`)} style={{ position: 'absolute', right: '0px', textTransform: 'capitalize' }}><FormOutlined />Edit Quiz</Button>
        </div>
      </List.Item>
    )}
  />
  </>
  )
}
