import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const DivisionsComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Divisions",
          path: "/divisions",
        },
      ])
    );
  }, []);

  return <div>Divisions</div>;
};

export default DivisionsComponent;
