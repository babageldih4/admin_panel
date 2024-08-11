import React from "react";
import { styled } from "styled-components";
const StyledContainer = styled("div")`
  padding: 20px;

  @media (max-width: 992px) {
    & {
      padding: 10px;
    }
  }
`;

export default React.memo(StyledContainer);
