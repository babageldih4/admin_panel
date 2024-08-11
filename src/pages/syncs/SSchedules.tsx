import { type FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const SSchedulesComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Synhronlar/Tertibi",
          path: "/syncs/sscheduless",
        },
      ])
    );
  }, []);
  return <div>Shedules syncs</div>;
};

export default SSchedulesComponent;
