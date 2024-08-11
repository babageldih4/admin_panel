import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const Products: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Harytlar",
          path: "/exhibtions/products",
        },
      ])
    );
  }, []);

  return <div>Products of exhibitions</div>;
};

export default Products;
