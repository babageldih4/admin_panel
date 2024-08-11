import { type FC } from "react";
import { Spin } from "antd";
type TProps = {
  style?: React.CSSProperties;
};

const Loader: FC<TProps> = ({ style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        ...style,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loader;
