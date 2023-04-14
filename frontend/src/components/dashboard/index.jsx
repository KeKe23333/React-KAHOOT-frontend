import { List, Button, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import fetchRequest from '../../utlis';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
// const listData = Array.from({
//   length: 5,
// }).map((_, i) => ({
//   href: 'https://ant.design',
//   title: `ant design part ${i}`,
//   avatar: `https://joesch.moe/api/v1/random?key=${i}`,
//   description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));
export default function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);
  const [showCreateGame, setShowCreateGame] = React.useState(false);
  const [newGameName, setNewGameName] = React.useState('');
  const navigate = useNavigate();
  // init page
  useEffect(() => {
    fetchRequest('quiz', 'GET', null).then((data) => {
      console.log('data is', data);
      setQuizzes(data.quizzes);
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
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          title={<a onClick={() => navigate(`/main/about/${quizzes.id}`)}>{quizzes.name}</a>}
        />
        <>0 Question</><br></br>
        <>Time to complete quiz: 10mins</>
        <div style={{ marginTop: '20px', position: 'relative', }}>
          <Button onClick={ () => handleDeleteGame(quizzes.id) } type="dashed" danger style={{ position: 'absolute', right: '120px', height: '32px', textTransform: 'capitalize' }}> <DeleteOutlined /> Delete Quiz</Button>
          <Button style={{ position: 'absolute', right: '0px', textTransform: 'capitalize' }}><FormOutlined />Edit Quiz</Button>
        </div>
      </List.Item>
    )}
  />
  </>
  )
}
