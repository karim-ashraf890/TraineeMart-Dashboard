import type { TableColumnsType } from "antd";
import type { Admin } from "./types";
import { formatDate } from "../../utils/formatDate";
import AdminActions from "./Pieces/AdminActions";
export const columns: TableColumnsType<Admin> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    // width: 60,
  },
  {
    title: "First name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    key: "phone_number",
    render: (_, record) => `${record.phone_code}-${record.phone_number}`,
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
    render: (value) => formatDate(value),
  },
  {
    title: "Created by",
    key: "created_by",
    render: (_, record) => record.created_by_adminName ?? "-",
  },
  {
    title: "Updated at",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value) => formatDate(value),
  },
  {
    title: "Updated by",
    key: "updated_by",
    render: (_, record) => record.updated_by_adminName ?? "-",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => <AdminActions admin={record} />,
    // width: 60,
  },
];
