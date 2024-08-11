import { type FC, ChangeEvent } from "react";
import { Input, Space } from "antd";

type TProps = {
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: FC<TProps> = ({
  name,
  placeholder,
  isRequired,
  type,
  value,
  onChange,
}) => {
  return (
    <Space
      style={{
        width: "100%",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "flex-start",
      }}
    >
      <Input
        value={value}
        placeholder={placeholder}
        type={type}
        status={isRequired ? "error" : undefined}
        onChange={onChange}
        style={{ width: "100%" }}
      />
      {isRequired && <span style={{ color: "red" }}>{name} is required</span>}
    </Space>
  );
};

export default CustomInput;
