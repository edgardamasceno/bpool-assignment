import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { UserOutlined } from '@ant-design/icons';
import ptBR from 'antd/lib/locale/pt_BR';

import Contact from './pages/Contact'
import ContactModal from './components/ContactModal';
import ContactBreadcrumb from './components/ContactBreadcrumb';
import { ContactContextProvider } from './contexts/ContactContext';

import styles from './styles.module.scss';
import 'antd/dist/antd.css';

import { ReactComponent as Logo } from './assets/logo.svg';

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <ContactContextProvider>
        <Layout className={styles.root}>
          <ContactModal />
          <Header>
            <Logo />
            <UserOutlined />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <ContactBreadcrumb />
            <section>
              <Contact />
            </section>
          </Content>
          <Footer style={{ textAlign: 'center' }}>By Edgar Damasceno - 2020</Footer>
        </Layout>
      </ContactContextProvider>
    </ConfigProvider>
  );
}

export default App;
