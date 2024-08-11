import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const BrandsComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Brands",
          path: "/brands",
        },
      ])
    );
  }, []);

  return <div>Brands</div>;
};

export default BrandsComponent;
