import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
// import React from "react";
import Paragraph from "antd/es/typography/Paragraph";

function Breadcrumbs() {
  const { breadcrumbs } = useAppSelector((state) => state.general);

  function itemRender(route: any, params: any, items: ItemType[], paths: any) {
    params;
    items;
    return !route.path ? (
      <Paragraph ellipsis={true} style={{ maxWidth: "250px" }}>
        {route?.title}
      </Paragraph>
    ) : (
      <Link to={paths.join("/")}>
        <Paragraph ellipsis={true} style={{ maxWidth: "250px" }}>
          {route.title}
        </Paragraph>
      </Link>
    );
  }

  return (
    <Breadcrumb
      items={[
        {
          title: "Home",
          path: "/",
        },
        ...breadcrumbs,
      ]}
      itemRender={itemRender}
    />
  );
}

export default Breadcrumbs;

// Second version
//
// import React from "react";
// import { Breadcrumb } from "antd";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../../store/hooks";
// import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
// import Paragraph from "antd/es/typography/Paragraph";

// function Breadcrumbs() {
//   // Access breadcrumbs state from Redux store
//   const { breadcrumbs } = useAppSelector((state) => state.general);

//   // Custom item render function to handle link rendering
//   function itemRender(route: any, params: any, items: ItemType[], paths: any) {
//     return !route.path ? (
//       <Paragraph ellipsis={true} style={{ maxWidth: "250px" }}>
//         {route?.title}
//       </Paragraph>
//     ) : (
//       <Link to={paths.join("/")}>
//         <Paragraph ellipsis={true} style={{ maxWidth: "250px" }}>
//           {route.title}
//         </Paragraph>
//       </Link>
//     );
//   }

//   // Breadcrumb items including the home link and dynamic breadcrumbs from the store
//   const breadcrumbItems = [
//     {
//       title: "Home",
//       path: "/",
//     },
//     ...breadcrumbs,
//   ];

//   return <Breadcrumb items={breadcrumbItems} itemRender={itemRender} />;
// }

// export default Breadcrumbs;
