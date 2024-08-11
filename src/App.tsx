// import { FC } from "react";
// import { ConfigProvider } from "antd";
// import { useAppSelector } from "./store/hooks";
// import { darkTheme, lightTheme, sharedTheme } from "./plugins/antd";
// import { theme } from "antd";
// import RouteList from "./routes/RouteList";
// const App: FC = () => {
//   const { userTheme } = useAppSelector((state) => state.general);
//   const themeToken = {
//     ...sharedTheme,
//     ...(userTheme?.mode === "dark"
//       ? {
//           ...darkTheme,
//           algorithm: userTheme?.compact
//             ? [theme.darkAlgorithm, theme.compactAlgorithm]
//             : theme.darkAlgorithm,
//         }
//       : {
//           ...lightTheme,
//           algorithm: userTheme?.compact
//             ? [theme.defaultAlgorithm, theme.compactAlgorithm]
//             : theme.defaultAlgorithm,
//         }),
//   };
//   return (
//     <ConfigProvider
//       theme={{
//         ...themeToken,
//         token: { ...themeToken?.token, ...userTheme },
//       }}
//     >
//       <RouteList />
//     </ConfigProvider>
//   );
// };

// export default App;
