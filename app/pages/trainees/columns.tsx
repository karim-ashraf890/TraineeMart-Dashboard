import type { TableColumnsType } from "antd";
import type { Student } from "./types";
import { formatDate } from "../../utils/formatDate";
import StudentActions from "./Pieces/StudentActions";

export const columns: TableColumnsType<Student> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
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
    render: (_, record) =>
      record.created_by_adminName ||
      record.created_by_studentName ||
      record.created_by_organizationName ||
      "-",
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
    render: (_, record) =>
      record.updated_by_adminName ||
      record.updated_by_studentName ||
      record.updated_by_organizationName ||
      "-",
  },

  // ============================================================
  // Actions: هنا بنظهر Edit و Delete لكل Trainee في الجدول
  // ============================================================
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => <StudentActions student={record} />,
  },
];
