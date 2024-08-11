import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const Clients: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Clients",
          path: "/clients",
        },
      ])
    );
  }, []);

  return <div>Clients</div>;
};

export default Clients;
