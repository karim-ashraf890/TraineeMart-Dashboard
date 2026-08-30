import { Input, Select, Space } from "antd";

type PhoneInputProps = {
  phoneCode: string;
  phoneNumber: string;
  // onCodeChange: (value: string) => void;
  // onPhoneChange: (value: string) => void;
  // phoneCodeError?: string;
  // phoneNumberError?: string;
};

export default function PhoneInput({
  phoneCode,
  phoneNumber,
  // onCodeChange,
  // onPhoneChange,
  // phoneCodeError,
  // phoneNumberError,
}: PhoneInputProps) {
  return (
    <>
      <Space.Compact style={{ width: "100%" }}>
        <Select
          // status={phoneCodeError ? "error" : ""}
          value={phoneCode}
          placeholder="Code"
          style={{ width: "20%" }}
          // onChange={onCodeChange}
          options={[
            { value: "+20", label: "🇪🇬 +20" },
            { value: "+966", label: "🇸🇦 +966" },
          ]}
        />
        <Input
          // status={phoneNumberError ? "error" : ""}
          value={phoneNumber}
          // onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Phone Number"
        />
      </Space.Compact>
      {/* 
      {phoneCodeError && (
        <p
          style={{
            color: "#ff4d4f",
            marginTop: 6,
            fontSize: 12,
          }}
        >
          {phoneCodeError}
        </p>
      )}

      {phoneNumberError && (
        <p
          style={{
            color: "#ff4d4f",
            marginTop: 6,
            fontSize: 12,
          }}
        >
          {phoneNumberError}
        </p>
      )} */}
    </>
  );
}
