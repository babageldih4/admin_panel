import { FC, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../store/hooks";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { setToken } from "../../store/auth/authSlice";
// import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuthHook } from "../../hooks/auth";
// import { jwtDecode } from "jwt-decode";
import { cookieSetter } from "../../functions";

interface valuesType {
  userName: string;
  password: string;
}

const LoginPage: FC = () => {
  const { Item } = Form;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useAuthHook();
  const [loadings, setLoadings] = useState<boolean>();

  const loginSuccessHandler = (data: any) => {
    Cookies.remove("admin_token");
    Cookies.remove("admin_token");
    dispatch(setToken(data?.token));
    sessionStorage.setItem("admin_token", data?.token);
    cookieSetter("admin_token", data?.token);
    setLoadings(false);
    navigate("/");
  };
  const loginErrorHandler = (err: any) => {
    if (err?.response?.status === 400) {
      notification.error({
        message: err.response.status,
        description: "Wrong Username or Password",
      });
    } else if (err?.response?.status === 500) {
      notification.error({
        message: err.response.status,
        description: "Some Server Error",
      });
    } else {
      notification.error({
        message: "",
        description: "Unknown Error",
      });
    }
    setLoadings(false);
  };

  const onFinish = async (values: valuesType) => {
    setLoadings(true);
    try {
      const response = await login({
        ...values,
        longitude: 23.232112,
        latitude: 23.232112,
        program: "web",
      });
      const { data } = response;
      // const decoded = jwtDecode(data.token);
      // console.log(decoded);
      // console.log(data);

      loginSuccessHandler({ ...data });
    } catch (err: any) {
      loginErrorHandler(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    notification.error({
      message: "wrongValues",
      description: errorInfo.errorFields[0].errors[0] || "Unknown Error",
    });
  };
  return (
    <div style={{ maxWidth: 300, margin: "auto", paddingTop: 50 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        onFinishFailed={onFinishFailed}
      >
        <Item name="userName" label={""}>
          <Input
            prefix={<UserOutlined style={{ marginRight: "10px" }} />}
            placeholder={"Enter your username" || ""}
            type="text"
            variant="outlined"
          />
        </Item>
        <Item
          name="password"
          label=""
          rules={[{ message: "Enter your password" || "" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ marginRight: "10px" }} />}
            type="password"
            placeholder={"Enter your password" || ""}
            variant="outlined"
          />
        </Item>
        <Item>
          {" "}
          <Button
            type="primary"
            htmlType="submit"
            loading={loadings}
            block
            // onClick={() => navigate("/home")}
          >
            Login
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default LoginPage;

// import { FC } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Form, Input, Button, Alert } from "antd";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// // import { login } from "../../store/authSlice";
// // import { useNavigate } from "react-router-dom";

// const LoginPage: FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.auth);
//   // const navigate = useNavigate();

//   const onFinish = (values: { userName: string; password: string }) => {
//     dispatch(
//       login({
//         userName: values.userName,
//         password: values.password,
//         program: "web",
//         // longitude: 23.232112,
//         // latitude: 23.232112,
//       })
//     );
//   };

//   return (
//     <div style={{ maxWidth: 300, margin: "auto", paddingTop: 50 }}>
//       <h2>Login</h2>
//       {error && <Alert message={error} type="error" showIcon />}
//       <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
//         <Form.Item
//           name="userName"
//           rules={[{ required: true, message: "Please input your Username!" }]}
//         >
//           <Input placeholder="Username" />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input.Password placeholder="Password" />
//         </Form.Item>
//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             block
//             // onClick={() => navigate("/home")}
//           >
//             Login
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default LoginPage;
