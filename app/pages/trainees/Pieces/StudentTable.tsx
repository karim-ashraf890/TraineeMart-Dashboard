import { Table } from "antd";

import type { Student } from "../types";

import { columns } from "../columns";

import styles from "./table.module.css";

interface Props {
  students: Student[];
}

export default function StudentTable({ students }: Props) {
  return (
    <Table
      columns={columns}
      dataSource={students}
      rowKey="id"
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
}
