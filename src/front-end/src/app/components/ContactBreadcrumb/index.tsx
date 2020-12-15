import React from 'react';
import { Breadcrumb } from 'antd';
import { useStatus } from '../../contexts/ContactContext';
import { labels } from '../../helpers';

const ContactBreadcrumb: React.FC = () => {
  const { status } = useStatus();

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
