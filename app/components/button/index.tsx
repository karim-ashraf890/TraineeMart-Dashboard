import styles from "./index.module.css";
import { Button as AntButton } from "antd";

type ButtonProps = {
  id?: string;
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  id,
  text,
  type = "button",
  className = "",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <AntButton
      id={id}
      htmlType={type}
      className={`${styles.buttonGlobal} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </AntButton>
  );
}
