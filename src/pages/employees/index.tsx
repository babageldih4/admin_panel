import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const EmployeesComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Employees",
          path: "/employees",
        },
      ])
    );
  }, []);

  return <div>Employees</div>;
};

export default EmployeesComponent;
