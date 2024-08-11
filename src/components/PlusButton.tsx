import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
type TProps = {
  navigation: string;
};

const PlusCircleOutlinedButton = (props: TProps) => {
  const navigate = useNavigate();
  return (
    <PlusCircleOutlined
      onClick={() => navigate(props.navigation)}
      style={{
        zIndex: 100,
        position: "fixed",
        right: "28px",
        bottom: "15px",
        borderRadius: "50%",
        cursor: "pointer",
        color: "orange",
        fontSize: "30px",
      }}
    />
  );
};

export default PlusCircleOutlinedButton;
