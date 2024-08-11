import { type FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const SHistoriesComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Synhronlar/Taryhy",
          path: "/syncs/shistories",
        },
      ])
    );
  }, []);
  return <div>Hystories Syncs</div>;
};

export default SHistoriesComponent;
