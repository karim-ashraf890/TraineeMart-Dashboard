import { Switch } from "antd";
import type { TableColumnsType } from "antd";
import type { Organization } from "./types";
import { formatDate } from "../../utils/formatDate";
import OrganizationActions from "./Pieces/OrganizationActions";

interface Props {
  handleApprovedChange: (organization: Organization, approved: boolean) => void;
}

export const columns = ({
  handleApprovedChange,
}: Props): TableColumnsType<Organization> => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    title: "Service type",
    dataIndex: "serviceType_name_en",
    key: "serviceType_name_en",
  },
  {
    title: "Approved",
    key: "approved",
    render: (_, record) => (
      <Switch
        checked={record.approved === 1}
        onChange={(checked) => {
          handleApprovedChange(record, checked);
        }}
      />
    ),
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
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => <OrganizationActions organization={record} />,
  },
];
