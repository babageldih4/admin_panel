import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const ClientEmails: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "E-poçtalar",
          path: "/clientEmails",
        },
      ])
    );
  }, []);

  return <div>ClientEmails</div>;
};

export default ClientEmails;
