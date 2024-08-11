import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const ClientEmailHistory: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "E-poçta Taryhy",
          path: "/clientEmailHistory",
        },
      ])
    );
  }, []);

  return <div>ClientHistory</div>;
};

export default ClientEmailHistory;
