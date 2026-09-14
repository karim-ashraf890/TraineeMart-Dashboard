import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { AiOutlineMore } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Student } from "../types";
import styles from "./StudentActions.module.css";
import { useAxios } from "../../../hooks/useAxios";
import { deleteTrainee } from "../../../apis/trainees/update-trainee";

interface Props {
  student: Student;
}

export default function StudentActions({ student }: Props) {
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
        alert();
        navigate(`/trainees/edit/${student.id}`);
        break;

      case "delete":
        try {
          await deleteTrainee(axios, student.id);
          alert("Trainee deleted successfully");
          console.log("Trainee deleted successfully");

          // ============================================================
          // بعد نجاح الحذف نعمل Refresh للصفحة
          // عشان الـ Trainee المحذوف يختفي من الجدول فورًا
          // ============================================================
          window.location.reload();
        } catch (error) {
          console.error("Delete trainee failed:", error);
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
