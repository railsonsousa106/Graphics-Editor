import React from "react";
import styled from "styled-components/macro";

import { CircularProgress } from "@material-ui/core";

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

const Loader = () => {
  return (
    <Root>
      <CircularProgress m={2} color="secondary" />
    </Root>
  );
};

export default Loader;
