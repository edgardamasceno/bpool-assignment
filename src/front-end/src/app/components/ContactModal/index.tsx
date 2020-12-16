import React from 'react';
import { Alert, Button, Col, Row, Switch } from 'antd';
import moment, { Moment } from 'moment';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { editContact, getContacts, newContact } from '../../services/contactService';
import { useStatus, useSelected, useData, useErrorList } from '../../contexts/ContactContext';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { IContact } from '../../interfaces';
import { labels } from '../../helpers';

const ContactModal: React.FC = () => {
  const { status, setStatus } = useStatus();
  const { selected, setSelected } = useSelected();
  const { setData } = useData();
  const { errorList, setErrorList } = useErrorList();

  const handleChange = (prop: string) => (
    event: {
      target: { value: any };
    }
  ) => {
    setSelected({ ...selected, [prop]: event.target.value });
  };

  const handleSelect = (prop: string) => (value: string | Moment) => {
    setSelected({ ...selected, [prop]: value });
  };

  const handleEdit = () => {
    editContact(selected._id, selected, setErrorList).then((contact: IContact) => {
      if (JSON.stringify(contact) !== undefined) {
        getContacts().then((contacts: Array<IContact>) => {
          setData(contacts);
          setStatus(null);
          setSelected(null);
          setErrorList([]);
        });
      }
    });
  }

  const handleSave = () => {
    newContact(selected, setErrorList)
      .then((contact: IContact) => {
        if (JSON.stringify(contact) !== undefined) {
          getContacts().then((contacts: Array<IContact>) => {
            setData(contacts);
            setStatus(null);
            setSelected(null);
            setErrorList([]);
          });
        }
      });
  }


  const handleOk = () => {
    if (status === 'edit') {
      handleEdit();
    }
    else {
      handleSave();
    }
  }

  const getLock = () => {
    if (status === 'view' || status === 'edit') {
      return (
        <Row gutter={[16, 16]} justify='end' align='middle' style={{ textAlign: 'right' }}>
          <Col span={24} >
            <Switch
              checkedChildren={<UnlockOutlined />}
              unCheckedChildren={<LockOutlined />}
              defaultChecked={status === 'edit'}
              onChange={() => setStatus(status === 'edit' ? 'view' : 'edit')}
            />
          </Col>
        </Row>
      )
    }
  }

  return (
    <Modal
      title={`${status ? labels[status] : ''} Contato`}
      centered
      visible={status !== null && status !== 'delete'}
      width={720}
      footer={[
        <Button key='back' onClick={() => {
          setStatus(null);
          setSelected(null);
          setErrorList([]);
        }}>
          Cancelar
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk} disabled={status === 'view' ? true : false}>
          Salvar
        </Button>,
      ]}
    >
      {getLock()}
      <Form
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 22,
        }}
        layout='horizontal'
      >
        <Form.Item label='Nome'>
          <Input
            readOnly={status === 'view' ? true : false}
            value={selected ? selected.name : ''}
            lang='pt-BR'
            inputMode='text'
            onChange={handleChange('name')}
          />
        </Form.Item>
        <Form.Item label='E-mail'>
          <Input
            type='email'
            readOnly={status === 'view' ? true : false}
            value={selected ? selected.email : ''}
            lang='pt-BR'
            inputMode='email'
            onChange={handleChange('email')}

          />
        </Form.Item>
        <Form.Item label='Data Nasc.' labelAlign='right' colon >
          <DatePicker
            format='DD/MM/YYYY'
            disabled={status === 'view' ? true : false}
            value={selected ? moment(selected.birth) : moment(new Date())}
            onSelect={handleSelect('birth')}
            clearIcon

          />
        </Form.Item>
        <Form.Item label='Profissão'>
          <Select
            disabled={status === 'view' ? true : false}
            value={selected !== undefined ? selected?.occupation?.toUpperCase() : 'SELECIONE'}
            onSelect={handleSelect('occupation')}
          >
            <Select.Option value='SELECIONE' >Selecione</Select.Option>
            <Select.Option value='ANALISTA SISTEMAS'>Analista de Sistemas</Select.Option>
            <Select.Option value='MÉDICO'>Médico</Select.Option>
            <Select.Option value='PROFESSOR'>Professor</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      {
        errorList.map((message, index: number) => {
          return (
            <Alert
              style={{ marginTop: '5px' }}
              key={index}
              message={message}
              type='error'
              showIcon
              closable
            />
          )
        })
      }

    </Modal>
  );
}

export default ContactModal;
