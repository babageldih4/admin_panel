import { type FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const SettingsComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Settings",
          path: "/settings",
        },
      ])
    );
  }, []);
  return <div>Settings</div>;
};

export default SettingsComponent;
