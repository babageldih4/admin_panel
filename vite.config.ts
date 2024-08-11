// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import sass from "sass";
// // import { svgr } from "@svgr/rollup";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "localhost",
//     port: 3003,
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         // Specify Sass implementation directly
//         implementation: sass,
//       },
//     },
//   },
// });
// // import { defineConfig } from 'vite';

// // export default defineConfig({
// //   server: {
// //     host: 'your-desired-hostname', // Change to your desired host
// //   },
// // });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    manifest: true,
  },
  server: {
    proxy: {
      "/api": {
        //http://119.235.112.154:4444/api-docs/#/Admin%20Notifications/get_admin_v1_userNotifications
        //http://172.20.14.38:5177/api-docs/#/Notifications/get_api_v1_notifications_my
        // target: "http://172.20.14.38:5177/api/v1",
        target: "http://119.235.112.154:4444/admin/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: true,
  },
  preview: {
    port: Number(process.env.PORT),
    host: "localhost",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
