import { type FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const SManualComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Synhronlar/Manual",
          path: "/syncs/smanual",
        },
      ])
    );
  }, []);
  return <div>Manual Syncs</div>;
};

export default SManualComponent;
