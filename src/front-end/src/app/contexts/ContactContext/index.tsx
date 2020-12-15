import React, { useState, createContext, useContext, useEffect } from 'react';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined, EyeFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import styled from 'styled-components';
import { IContact } from '../../interfaces';
import * as ContactService from '../../services/contactService';

type StatusType = 'new' | 'edit' | 'view' | 'delete' | null;

type ContactContextType = {
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  selected: IContact | any | null;
  setSelected: React.Dispatch<React.SetStateAction<IContact | {} | null>>;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<Array<IContact> | []>>;
  columns: any[];
  errorList: string[];
  setErrorList: React.Dispatch<React.SetStateAction<Array<string> | []>>;
}

const DEFAULT_VALUE: ContactContextType = {
  status: null,
  setStatus: () => { },
  selected: null,
  setSelected: () => { },
  data: [],
  setData: () => { },
  columns: [],
  errorList: [],
  setErrorList: () => { }
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

  const contactTableColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text: React.ReactNode, record: IContact, index: number) => (
        <Link
          onClick={
            () => {
              ContactService.viewContact(record._id)
                .then((contact: IContact) => {
                  setSelected(contact);
                })
                .then(() => setStatus('view'))
                .catch(error => console.log(error.body))
            }
          }>
          {record.name}
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
      render: (text: React.ReactNode, record: IContact, index: Number) => (
        <span> {new Date((text || new Date()).toString()).toLocaleDateString('pt-BR')}</span>
      ),
    },
    {
      title: 'Profissão',
      key: 'occupation',
      dataIndex: 'occupation',
      render: (text: React.ReactNode) => (
        <span style={{ textTransform: 'capitalize' }}>{(text || '').toString().toLocaleLowerCase('pt-BR')}</span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (text: string, record: IContact, index: number) => (
        <Space size='middle'>
          <EditFilled onClick={() => {
            setStatus('edit');
            ContactService.viewContact(record._id)
              .then((contact: IContact) => {
                setSelected(contact);
              })
              .then(() => setStatus('edit'))
              .catch(error => console.log(error.body))
          }} />
          <EyeFilled onClick={() => {
            setStatus('view');
            ContactService.viewContact(record._id)
              .then((contact: IContact) => {
                setSelected(contact);
              })
              .then(() => setStatus('view'))
              .catch(error => console.log(error.body))
          }} />
          <DeleteFilled onClick={() => {
            setStatus('delete');
            showDeleteConfirm(record._id, record.name);
          }
          } />
        </Space>
      ),
    },
  ]

  const showDeleteConfirm = (id: string, name:string) => {
    confirm({
      title: `Tem certeza que deseja remover ${name}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Esta ação não poderá ser desfeita',
      okText: 'Sim, remover',
      okType: 'danger',
      cancelText: 'Não',
      width: 720,
      centered: true,
      onOk() {
        ContactService.deleteContact(id)
          .then((contact: IContact) => {
            ContactService.getContacts().then((contacts: Array<IContact>) => {
              setData(contacts);
            });
            setSelected(null);
          })
          .then(() => setStatus(null))
          .catch(error => console.log(error.body))
      },
      onCancel() {
        setSelected(null);
        setStatus(null);
      },
    });
  }

  const [status, setStatus] = useState<StatusType>(DEFAULT_VALUE.status);
  const [selected, setSelected] = useState<IContact | null | any>(null);
  const [errorList, setErrorList] = useState<Array<string>>([]);
  const [columns] = useState<Array<any>>(contactTableColumns);
  const [data, setData] = useState<Array<IContact>>([]);

  useEffect(() => {
    ContactService.getContacts().then((contacts: Array<IContact>) => {
      setData(contacts);
    })
  }, []);

  return (
    <ContactContext.Provider value={{ status, setStatus, selected, setSelected, columns, data, setData, errorList, setErrorList }}>
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
  const { data, columns, setData } = context;
  return { data, columns, setData };
}

export function useSelected() {
  const context = useContext(ContactContext);
  const { selected, setSelected } = context;
  return { selected, setSelected };
}

export function useErrorList() {
  const context = useContext(ContactContext);
  const { errorList, setErrorList } = context;
  return { errorList, setErrorList };
}

export default ContactContext;
