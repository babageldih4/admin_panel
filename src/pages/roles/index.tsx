import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const RolesComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Roles",
          path: "/rolses",
        },
      ])
    );
  }, []);

  return <div>Roles</div>;
};

export default RolesComponent;
