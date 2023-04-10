import { TeamOutlined, UserOutlined, FileOutlined, PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
function getItem (label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const { Header, Content, Footer, Sider } = Layout;
const items = [
  getItem('Dashboard', 'dashboard', <PieChartOutlined />),
  getItem('About', 'about', <DesktopOutlined />),
  getItem('User', 'user', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

export default function Main () {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  // 这里可能会内存泄漏
  useEffect(() => {
    const tok = localStorage.getItem('token');
    if (!tok) { navigate('/login') }
    return () => {};
  }, [])
  function manuChange (item) {
    console.log('item is ', item);
    navigate(`/main/${item.key}`)
  }

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} onClick={manuChange} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              minHeight: 650,
            }}
          >
          {/* ===========================the component places here============================ */}
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
