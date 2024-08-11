import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";
// import { addTag } from "../../store/tagsView/tags-view.store";

const ProductsComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Products",
          path: "/products",
        },
      ])
    );
  }, []);

  return <div>Products</div>;
};

export default ProductsComponent;
