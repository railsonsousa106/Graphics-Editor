import React from "react";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { setTool, setMode } from "redux/reducers/boardReducer";

import { spacing } from "@material-ui/system";
import { Button as MuiButton, Tooltip as MuiTooltip } from "@material-ui/core";
import { ToggleButton as MuiToggleButton } from "@material-ui/lab";

import { TOOLS } from "../../constants";

const Button = styled(MuiButton)(spacing);
const Tooltip = styled(MuiTooltip)(spacing);
const ToggleButton = styled(MuiToggleButton)(spacing);

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 10px;
  background: #151515;
`;

const Toolbar = (props) => {
  const { socket, onReset } = props;

  const dispatch = useDispatch();
  const tool = useSelector((state) => state.boardReducer.tool);
  const handleReset = () => {
    onReset();
    socket.emit("reset");
  };
  const toggleTool = (toolClicked) => {
    if (tool !== toolClicked.name) {
      dispatch(setTool(toolClicked.name));
      if (toolClicked.modes) dispatch(setMode(toolClicked.modes[0].name));
    }
  };

  return (
    <Wrapper>
      {Object.keys(TOOLS).map((index) => (
        <Tooltip title={TOOLS[index].label} key={TOOLS[index].name} arrow>
          <ToggleButton
            mx={2}
            key={TOOLS[index].name}
            value={TOOLS[index].name}
            selected={tool === TOOLS[index].name}
            onClick={() => toggleTool(TOOLS[index])}
          >
            {TOOLS[index].icon}
          </ToggleButton>
        </Tooltip>
      ))}

      <Button mx={2} variant="outlined" color="secondary" onClick={handleReset}>
        Reset
      </Button>
    </Wrapper>
  );
};

export default Toolbar;
