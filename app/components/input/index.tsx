import type { ChangeEvent } from "react";
import { Input as AntInput, Select, Space } from "antd";
import styles from "./index.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";

type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  error?: string;
  phoneCode?: string;
  phoneNumber?: string;
  onPhoneCodeChange?: (value: string) => void;
  onPhoneNumberChange?: (value: string) => void;
};

export function Input({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  className = "",
  value,
  onChange,
  onSearch,
  error,
  phoneCode,
  phoneNumber,
  onPhoneCodeChange,
  onPhoneNumberChange,
}: InputProps) {
  const inputClass = `${styles.inputGlobal} ${className}`;

  return (
    <div
      className={`${styles.inputWrapper} ${
        error ? styles.inputWrapperError : ""
      } ${inputClass}`}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      {type === "password" ? (
        <AntInput.Password
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
        />
      ) : type === "search" ? (
        <AntInput.Search
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onSearch={onSearch}
          enterButton={<SearchOutlined />}
        />
      ) : type === "phone" ? (
        <Space.Compact style={{ width: "100%" }}>
          <Select
            value={phoneCode}
            placeholder="Code"
            style={{ width: "20%" }}
            onChange={onPhoneCodeChange}
            options={[
              { value: "+20", label: "🇪🇬 +20" },
              { value: "+966", label: "🇸🇦 +966" },
            ]}
          />
          <AntInput
            id={id}
            name={name}
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange?.(e.target.value)}
            placeholder={placeholder}
          />
        </Space.Compact>
      ) : (
        <AntInput
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
