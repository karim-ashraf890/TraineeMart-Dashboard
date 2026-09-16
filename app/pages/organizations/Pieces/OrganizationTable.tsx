import { Table } from "antd";
import type { Organization } from "../types";
import { columns } from "../columns";
import styles from "./table.module.css";

interface Props {
  organizations: Organization[];
  handleApprovedChange: (organization: Organization, approved: boolean) => void;
}

export default function OrganizationTable({
  organizations,
  handleApprovedChange,
}: Props) {
  return (
    <Table
      columns={columns({
        handleApprovedChange,
      })}
      dataSource={organizations}
      rowKey="id"
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
}
