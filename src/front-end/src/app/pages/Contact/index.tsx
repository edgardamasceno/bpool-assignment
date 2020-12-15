import React, { useContext } from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ContactTable from '../../components/ContactTable';
import { ContactContext } from '../../contexts/ContactContext';

const Contact: React.FC = () => {
  const { setStatus } = useContext(ContactContext);
  return (
    <>
      <PageHeader
        title='Lista de Contatos'
        subTitle='Crie, edite e remova contatos de sua lista'
        extra={
          <Button type='primary' icon={<PlusOutlined />} size='middle' onClick={() => {
            setStatus('new')
          }}>
            Adicionar Contato
            </Button>
        }
      />
      <ContactTable />
    </>
  );
}

export default Contact;
