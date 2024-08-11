import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const SubGroups: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Groups / Sub Groups",
          path: "/groups/subGroups",
        },
      ])
    );
  }, []);

  return <div>Sub-Groups</div>;
};

export default SubGroups;
