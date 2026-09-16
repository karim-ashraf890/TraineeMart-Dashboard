import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { Organization } from "../types";

interface Props {
  organization: Organization;
}

export default function OrganizationActions({ organization }: Props) {
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    console.log("Organization:", organization.id);
    console.log("Action:", key);
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "Edit",
    },
    {
      key: "delete",
      label: "Delete",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
    >
      <BsThreeDotsVertical style={{ cursor: "pointer" }} />
    </Dropdown>
  );
}
