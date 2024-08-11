import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const MainGroups: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Groups / Main Groups",
          path: "/groups/mainGroups",
        },
      ])
    );
  }, []);

  return <div>Main-Groups</div>;
};

export default MainGroups;
