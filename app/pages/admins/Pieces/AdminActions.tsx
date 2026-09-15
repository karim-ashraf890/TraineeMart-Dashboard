import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useParams } from "react-router";
import { AiOutlineMore } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Admin } from "../types";
import styles from "./AdminActions.module.css";
import { useAxios } from "../../../../app/hooks/useAxios";
import { deleteAdmin } from "../../../../app/apis/admin/update-admin";
import { toast } from "react-toastify";
interface Props {
  admin: Admin;
}
export default function AdminActions({ admin }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { axios } = useAxios();

  const items: MenuProps["items"] = [
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

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    switch (key) {
      case "edit":
        navigate(`/admins/edit/${admin.id}`);
        break;
      case "delete":
        const confirmed = window.confirm(
          "Are you sure you want to delete this admin ?",
        );
        if (!confirmed) {
          return;
        }
        try {
          await deleteAdmin(axios, admin.id);
          toast.success("Admin deleted successfully!");
          console.log("Admin deleted successfully");
          navigate("/admins?page=1&search=");
        } catch (error) {
          console.error("Delete admin failed:", error);
          toast.error("Delete trainee failed:");
        }
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
