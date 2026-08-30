import { Table } from "antd";
import type { Admin } from "../types";
import { columns } from "../columns";
import styles from "./table.module.css";

interface Props {
  admins: Admin[];
}

export default function AdminTable({ admins }: Props) {
  return (
    <Table
      columns={columns}
      dataSource={admins}
      rowKey="id"
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
}
