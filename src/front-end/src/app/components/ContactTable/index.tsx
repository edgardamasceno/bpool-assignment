import React from 'react';
import { Table } from 'antd';
import { useData } from '../../contexts/ContactContext';

import styles from './styles.module.scss';

const ContactTable: React.FC = () => {
  const { data, columns } = useData();
  return <Table columns={columns} dataSource={data} className={styles.root} pagination={false} />;
}

export default ContactTable;
