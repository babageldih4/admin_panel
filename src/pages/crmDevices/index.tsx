import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const CrmDevices: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Enjamlar",
          path: "/crmDevices",
        },
      ])
    );
  }, []);

  return <div>Crm Devices</div>;
};

export default CrmDevices;
