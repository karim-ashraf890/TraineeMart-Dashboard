import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

import type { Admin } from "../types";
import styles from "./AdminActions.module.css";

interface Props {
  admin: Admin;
}

export default function AdminActions({ admin }: Props) {
  const items: MenuProps["items"] = [
    {
      key: "view",
      label: (
        <div className={styles.menuItem}>
          <FiEye />
          <span>View</span>
        </div>
      ),
    },
    {
      key: "edit",
      label: (
        <div className={styles.menuItem}>
          <FiEdit2 />
          <span>Edit</span>
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <div className={`${styles.menuItem} ${styles.deleteItem}`}>
          <FiTrash2 />
          <span>Delete</span>
        </div>
      ),
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "view":
        console.log("View", admin);
        break;

      case "edit":
        console.log("Edit", admin);
        break;

      case "delete":
        console.log("Delete", admin);
        break;

      default:
        break;
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      trigger={["hover"]}
    >
      <div className={styles.actionButton}>
        <AiOutlineMore size={18} />
      </div>
    </Dropdown>
  );
}
