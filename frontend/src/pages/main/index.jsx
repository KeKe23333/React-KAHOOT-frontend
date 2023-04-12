import { TeamOutlined, UserOutlined, FileOutlined, PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Main () {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  // 这里可能会内存泄漏
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return () => {}
    } else {
      navigate('/main/dashboard')
      return () => {}
    }
  }, [token])

  function getItem (label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const { Content, Footer, Sider } = Layout;
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
  function manuChange (item) {
    console.log('item is ', item);
    navigate(`/main/${item.key}`)
  }
  function logout () {
    localStorage.removeItem('token');
    setToken(null);// junmp to login page
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
        <button style={{ marginLeft: 15, marginTop: 40 }} onClick={logout}>Logout</button>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
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
              minHeight: 945,
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
