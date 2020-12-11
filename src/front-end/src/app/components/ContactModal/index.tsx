import React from 'react';
import { useStatus, useSelected } from '../../contexts/ContactContext';
import moment from 'moment';

import {
  Modal, Form,
  Input,
  Select,
  DatePicker
} from 'antd';
import Contact from '../../interfaces';

interface Props {
  data?: Contact
}

const ContactModal: React.FC<Props> = ({ data }) => {
  const { status, setStatus } = useStatus();
  const { selected, setSelected } = useSelected();

  return <Modal
    title={`${data ? 'Editar' : 'Adicionar'} Contato`}
    centered
    visible={status !== null && status !== 'delete'}
    okText="Salvar"
    onOk={() => {
      setStatus(null);
      setSelected(null);
    }}
    okButtonProps={status === 'view' ? { 'disabled': true } : { disabled: false }}
    onCancel={() => {
      setStatus(null);
      setSelected(null);
    }}
    width={720}
  >
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="Nome">
        <Input disabled={status === 'view' ? true : false} value={selected ? selected.name : ''} />
      </Form.Item>
      <Form.Item label="E-mail">
        <Input type="email" disabled={status === 'view' ? true : false} value={selected ? selected.email : ''} />
      </Form.Item>
      <Form.Item label="Data Nascimento">
        <DatePicker format="DD/MM/YYYY" disabled={status === 'view' ? true : false} defaultValue={selected ? moment(selected.birth) : moment(new Date())} />
      </Form.Item>
      <Form.Item label="Profissão">
        <Select disabled={status === 'view' ? true : false} defaultValue={selected ? selected.occupation.toUpperCase() : 'SELECIONE'}>
          <Select.Option value="SELECIONE">Selecione</Select.Option>
          <Select.Option value="ANALISTA SISTEMAS">Analista de Sistemas</Select.Option>
          <Select.Option value="MÉDICO">Médico</Select.Option>
          <Select.Option value="PROFESSOR">Professor</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  </Modal>;
}

export default ContactModal;
