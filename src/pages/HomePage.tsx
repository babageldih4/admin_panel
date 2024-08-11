import { type FC, useEffect } from "react";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useAppDispatch } from "../store/hooks";
import { setBreadcrumbs } from "../store/general/generalSlice";
import { useGeneralHook } from "../hooks/generalHooks";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { getBrandOptions, getMainGroupsOptions, getDivisionOptions } =
    useGeneralHook();

  useEffect(() => {
    dispatch(setBreadcrumbs([]));
  }, []);

  useEffect(() => {
    getBrandOptions();
    getMainGroupsOptions();
    getDivisionOptions();
  }, []);
  return (
    <Content>
      <Typography>Dashbord</Typography>
    </Content>
  );
};

export default HomePage;
