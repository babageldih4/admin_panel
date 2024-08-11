// // src/NotificationImageUploader.js
// import React, { useRef, useState } from "react";
// import { Button } from "antd";
// import { MdAddAPhoto } from "react-icons/md";

// const NotificationImageUploader = ({
//   isMobileScreen,
//   handleNotificationImageAdd,
//   notificationEmptyValues,
//   imgLang,
// }) => {
//   const imageInput = useRef(null);

//   const addBannerImageClickReferencing = () => {
//     if (imageInput.current) {
//       imageInput.current.click();
//     }
//   };

//   return (
//     <div
//       className="add-image notification-image"
//       style={{
//         width: isMobileScreen ? "100%" : "300px",
//         height: "300px",
//       }}
//     >
//       <input
//         type="file"
//         accept=".jpg,.jpeg,.png,.tiff,.gif,.svg"
//         onChange={(e) => handleNotificationImageAdd(e)}
//         style={{ display: "none" }}
//         ref={imageInput}
//         onClick={(e) => (e.target.value = null)}
//       />
//       <Button
//         onClick={addBannerImageClickReferencing}
//         style={{
//           boxShadow: notificationEmptyValues.includes(imgLang)
//             ? "0px 0px 4px 0px red"
//             : "unset",
//         }}
//       >
//         <MdAddAPhoto />
//       </Button>
//     </div>
//   );
// };

// export default NotificationImageUploader;
