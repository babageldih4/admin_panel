import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const CrmSms: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "SMS",
          path: "/crmSms",
        },
      ])
    );
  }, []);

  return <div>Crm SMS</div>;
};

export default CrmSms;
