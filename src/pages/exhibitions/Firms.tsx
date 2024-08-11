import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const Firms: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Firmalar",
          path: "/exhibitions/firms",
        },
      ])
    );
  }, []);

  return <div>Firms of exhibitions</div>;
};

export default Firms;
