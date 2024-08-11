import styles from "../../styles/loader.module.scss";
import type { FC } from "react";
// import logoImage from "../../assets/Timar HR logo.png";
// import logoImageDark from "../../assets/logoDark.svg";
import { ImSpinner } from "react-icons/im";
import { useAppSelector } from "../../store/hooks";

const CircleLoading: FC<{ height?: string }> = ({ height = "250px" }) => {
  const { userTheme } = useAppSelector((state) => state.general);
  return (
    <div className={styles["r-loader"]} style={{ height }}>
      <div style={{ width: "80px" }}>
        <ImSpinner
          size="30"
          className={styles["rotate-image"]}
          style={{ width: userTheme?.mode === "dark" ? "50px" : "80px" }}
        />
        {/* <img
          src={userTheme?.mode === "dark" ? logoImageDark : logoImage}
          alt="logo"
          className={styles["rotate-image"]}
          style={{ width: userTheme?.mode === "dark" ? "50px" : "80px" }}
        /> */}
      </div>
    </div>
  );
};

export default CircleLoading;
