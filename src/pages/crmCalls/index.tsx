import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const CrmCalls: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Jaňlar",
          path: "/crmCalls",
        },
      ])
    );
  }, []);

  return <div>Crm Calls</div>;
};

export default CrmCalls;
