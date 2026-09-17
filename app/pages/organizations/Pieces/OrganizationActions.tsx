import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { AiOutlineMore } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Organization } from "../types";
import styles from "./OrganizationActions.module.css";
import { useAxios } from "../../../hooks/useAxios";
import { deleteOrganization } from "../../../apis/organization/update-organization";
import { toast } from "react-toastify";

interface Props {
  organization: Organization;
}

export default function OrganizationActions({ organization }: Props) {
  const navigate = useNavigate();
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
        navigate(`/organizations/edit/${organization.id}`);
        break;

      case "delete":
        const confirmed = window.confirm(
          "Are you sure you want to delete this organization?",
        );

        if (!confirmed) {
          return;
        }

        try {
          await deleteOrganization(axios, organization.id);

          toast.success("Organization deleted successfully!");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          toast.error("Delete organization failed!");
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
