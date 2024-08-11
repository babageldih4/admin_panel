import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Button, Result } from "antd";
import { m } from "framer-motion";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";
import { useLocation, useNavigate } from "react-router";
import MotionContainer from "../../components/animate/motion-container";
import { varBounce } from "../../components/animate/variants";
// import { useTranslation } from "react-i18next";

const StyledDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px);
`;

function ServerError() {
  const dispatch = useAppDispatch();
  const splittedLocation = useLocation()?.pathname?.split("/");
  //   const { t } = useTranslation();
  const navigate = useNavigate();
  //   const { language } = useAppSelector((state) => state.general);

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: splittedLocation?.[splittedLocation?.length - 1],
        },
      ])
    );
  }, []);
  return (
    <StyledDiv>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button type="primary" onClick={() => navigate("/")}>
                Back Home
              </Button>
            }
          />
        </m.div>
      </MotionContainer>
    </StyledDiv>
  );
}

export default ServerError;
