import React, { useState, createContext, useContext } from 'react';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined, EyeFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import styled from 'styled-components';
import Contact from '../../interfaces';

type StatusType = 'new' | 'edit' | 'view' | 'delete' | null;

export type ContactContextType = {
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  selected: Contact | null;
  setSelected: React.Dispatch<React.SetStateAction<Contact | null>>;
  data: any[];
  columns: any[];
}

const DEFAULT_VALUE: ContactContextType = {
  status: null,
  setStatus: () => { },
  selected: null,
  setSelected: () => { },
  data: [],
  columns: [],
}

const Link = styled.span`
  color: #1890ff;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer !important;
  &:hover  {
    opacity: 0.75;
  }
`

const { confirm } = Modal;

export const ContactContext = createContext<ContactContextType>(DEFAULT_VALUE);

export const ContactContextProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState<StatusType>(DEFAULT_VALUE.status);
  const [selected, setSelected] = useState<Contact | null>(null);
  function showDeleteConfirm() {
    confirm({
      title: 'Tem certeza que deseja remover este contato?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta ação não poderá ser desfeita',
      okText: 'Sim, remover',
      okType: 'danger',
      cancelText: 'Não',
      width: 720,
      centered: true,
      onOk() {
        setSelected(null);
        setStatus(null);
      },
      onCancel() {
        setSelected(null);
        setStatus(null);
      },
    });
  }
  const [columns] = useState<Array<any>>(
    [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text: React.ReactNode) => (
          <Link
            onClick={
              () => {
                setSelected({
                  id: "1",
                  name: "Patrick",
                  email: "patrick@boutique-pool.com",
                  birth: new Date("01/01/1980"),
                  occupation: "Analista Sistemas"
                });
                setStatus('view');
              }
            }>
            {text}
          </Link>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Data nascimento',
        dataIndex: 'birth',
        key: 'birth',
      },
      {
        title: 'Profissão',
        key: 'occupation',
        dataIndex: 'occupation',
      },
      {
        title: '',
        key: 'action',
        render: (text: any, record: any) => (
          <Space size="middle">
            <EditFilled onClick={() => {
              setStatus('edit');
              setSelected({
                id: "1",
                name: "Patrick",
                email: "patrick@boutique-pool.com",
                birth: new Date("01/01/1980"),
                occupation: "Analista Sistemas"
              });
            }} />
            <EyeFilled onClick={() => {
              setStatus('view');
              setSelected({
                id: "1",
                name: "Patrick",
                email: "patrick@boutique-pool.com",
                birth: new Date("01/01/1980"),
                occupation: "Analista Sistemas"
              });
            }} />
            <DeleteFilled onClick={() => {
              setStatus('delete');
              showDeleteConfirm();
            }
            } />
          </Space>
        ),
      },
    ]);

  const [data] = useState<Array<any>>(
    [
      {
        key: '1',
        name: 'Patrick',
        email: 'patrick@boutique-pool.com',
        birth: '01/01/1980',
        occupation: 'Analista Sistemas'
      }
    ]);
  return (
    <ContactContext.Provider value={{ status, setStatus, selected, setSelected, columns, data }}>
      {children}
    </ContactContext.Provider>
  );

}

export function useStatus() {
  const context = useContext(ContactContext);
  const { status, setStatus } = context;
  return { status, setStatus };
}

export function useData() {
  const context = useContext(ContactContext);
  const { data, columns } = context;
  return { data, columns };
}

export function useSelected() {
  const context = useContext(ContactContext);
  const { selected, setSelected } = context;
  return { selected, setSelected };
}

export default ContactContext;
