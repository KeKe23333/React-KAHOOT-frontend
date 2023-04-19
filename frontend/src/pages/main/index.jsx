import React, { useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import { PieChartOutlined, } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header } = Layout;
export default function Main () {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return () => {}
    }
  }, [])

  function getItem (label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const { Content, Footer } = Layout;
  const items = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
  ];
  function manuChange (item) {
    console.log('item is ', item);
    navigate(`/main/${item.key}`)
  }
  function logout () {
    localStorage.removeItem('token');
    setToken(null);// junmp to login page
    location.pathname = '/login';
  }
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          backgroundColor: '#3498db',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        <p
          style={{
            color: 'white',
            fontSize: '30px',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            alignItems: 'center',
          }}
        >BigBrain</p>
        <Menu
          style={{
            backgroundColor: '#3498db',
            color: 'white',
          }}
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          onClick={manuChange}
        />
        <div style={{ marginLeft: '70%' }}>
        <button style={{ height: '40px', width: '140px', alignContent: 'center', }} onClick={logout}>Logout</button>
        </div>
      </Header>
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
  );
}
