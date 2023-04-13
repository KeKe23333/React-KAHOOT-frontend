import { List, Button, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import fetchRequest from '../../utlis';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
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
        Notification();
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
    renderItem={(item) => (
      <List.Item
        key={item.title}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          title={<a onClick={() => navigate('/main/about')}>{item.name}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  </>
  )
}
