import { List, Button, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import fetchRequest from '../../utlis';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import { FormOutlined, DeleteOutlined, StopOutlined, CaretRightOutlined, CopyOutlined } from '@ant-design/icons';
export default function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);
  const [showCreateGame, setShowCreateGame] = React.useState(false);
  const [newGameName, setNewGameName] = React.useState('');
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
    fetchRequest('quiz', 'GET', null).then((data) => {
      console.log('quiz list is ', data);
      data.quizzes.forEach((quiz) => {
        fetchRequest(`quiz/${quiz.id}`, 'GET', null).then((quizData) => {
          console.log('quize detial', quizData);
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
    fetchRequest('quiz/new', 'POST', payload).then(() => {
      setNewGameName('');
      setShowCreateGame(false);
      // refresh the game list
      fetchRequest('quiz', 'GET', null).then((data) => {
        setQuizzes(data.quizzes);
        console.log(quizzes)
        Notification({ message: 'Create game successful!' });
      });
    });
  }
  // delete a game
  function handleDeleteGame (id) {
    fetchRequest(`quiz/${id}`, 'DELETE', null).then(() => {
      // refresh the game list
      fetchRequest('quiz', 'GET', null).then((data) => {
        setQuizzes(data.quizzes);
        console.log(quizzes)
        Notification({ message: 'Delete game successful!' });
      });
    });
  }

  // ============================================Play A Game============================================
  // start a game
  function handleStartGame (quizId) {
    fetchRequest(`quiz/${quizId}/start`, 'POST', null).then(() => {
      console.log('start game');
      // to featch the quiz detail to get the sessions id.
      fetchRequest(`quiz/${quizId}`, 'GET', null).then((quizDetail) => {
        if (quizDetail.oldSessions === null) {
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
    fetchRequest(`quiz/${quizId}/end`, 'POST', null).then(() => {
      Notification({ message: 'End game successful!' });
      navigate('/main')
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
        console.log(page);
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
              <Button style={{ position: 'absolute', left: '13px', top: '60px', textTransform: 'capitalize' }}><CopyOutlined />Copy Game Link</Button>
              <Button onClick={() => handleEndGame(quizzes.id) } style={{ position: 'absolute', left: '10px', top: '100px', textTransform: 'capitalize' }} danger type="primary"><StopOutlined />End The Game with</Button>
              </div> }
        </div>
        <List.Item.Meta
          title={<a onClick={() => navigate(`/main/quiz/${quizzes.id}/${quizzes.name}`)}>{quizzes.name}</a>}
        />
        <>{quizzes.questionLength} Question</><br></br>
        <>Time to complete quiz: {quizzes.quizTimeAllocated} seconds  </>
        <div style={{ marginTop: '20px', position: 'relative', }}>
          <Button onClick={ () => handleDeleteGame(quizzes.id) } type="dashed" danger style={{ position: 'absolute', right: '120px', height: '32px', textTransform: 'capitalize' }}> <DeleteOutlined /> Delete Quiz</Button>
          <Button onClick={() => navigate(`/main/quiz/${quizzes.id}/${quizzes.name}`)} style={{ position: 'absolute', right: '0px', textTransform: 'capitalize' }}><FormOutlined />Edit Quiz</Button>
        </div>
      </List.Item>
    )}
  />
  </>
  )
}
