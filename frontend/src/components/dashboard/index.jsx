import { List, Button, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import fetchRequest from '../../utlis';
const data = Array.from({
  length: 5,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://joesch.moe/api/v1/random?key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
export default function Dashboard () {
  const [quizzes, setQuizzes] = React.useState('');
  const [showCreateGame, setShowCreateGame] = React.useState(false);
  const [newGameName, setNewGameName] = React.useState('');
  // init page
  useEffect(() => {
    fetchRequest('quiz', 'GET', null).then((data) => {
      console.log('data is', data);
      setQuizzes(data.quizzes);
    });
  }, [])
  function handleCreateGame () {
    console.log('quizzes is', quizzes);

    console.log('we have input', newGameName)
    // const payload = {
    //   name: newGameName,
    // }
    // fetchRequest('quiz', 'POST', payload).then((data) => {
    //   console.log('data is', data);
    //   setQuizzes(data.quizzes);
    // });
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
    dataSource={data}
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
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  </>
  )
}
