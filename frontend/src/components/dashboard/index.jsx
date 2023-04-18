import { List, Button, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import fetchRequest from '../../utlis';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

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
        Notification({ message: 'Create game successfully!' });
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
        Notification({ message: 'Delete game successfully!' });
      });
    });
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
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            style={{ cursor: 'pointer', }}
          />
        }
      >
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
