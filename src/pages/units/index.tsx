import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const UnitsComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Units",
          path: "/units",
        },
      ])
    );
  }, []);

  return <div>Units</div>;
};

export default UnitsComponent;
