import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const ScalingSystemsComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "ScalingSystems",
          path: "/scalingSystems",
        },
      ])
    );
  }, []);

  return <div>Scaling Systems</div>;
};

export default ScalingSystemsComponent;
