import React from 'react';
import { Breadcrumb } from 'antd';
import { useStatus } from '../../contexts/ContactContext';

interface Dictionary<T> {
  [Key: string]: T;
}

const ContactBreadcrumb: React.FC = () => {
  const { status } = useStatus();
  const labels: Dictionary<string> = {
    new: "Adicionar",
    edit: "Editar",
    view: "Visualizar",
    delete: "Remover"
  }

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Contatos</Breadcrumb.Item>
      {status ?
        <Breadcrumb.Item>{labels[status]}</Breadcrumb.Item> : ''
      }

    </Breadcrumb>
  );
}

export default ContactBreadcrumb;
