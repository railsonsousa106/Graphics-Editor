import React from "react";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setMode,
  setStrokeWidth,
  setFill,
  setStrokeType,
} from "redux/reducers/boardReducer";

import { spacing } from "@material-ui/system";
import { ColorPicker } from "material-ui-color";
import {
  Box,
  Divider,
  Typography as MuiTypography,
  Tooltip,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";
import { ToggleButton as MuiToggleButton } from "@material-ui/lab";
import SliderInput from "../../components/SliderInput";

import { TOOLS } from "../../constants";

const Typography = styled(MuiTypography)(spacing);
const ToggleButton = styled(MuiToggleButton)`
  margin: 0 10px !important;
`;
const Select = styled(MuiSelect)`
  .MuiSelect-select {
    width: 80px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 10px;
  background: #151515;
`;

const palette = {
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "yellow",
  cyan: "cyan",
  lime: "lime",
  gray: "gray",
  orange: "orange",
  purple: "purple",
  black: "black",
  white: "white",
  pink: "pink",
  darkblue: "darkblue",
};

const Settingsbar = () => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.boardReducer.color);
  const fill = useSelector((state) => state.boardReducer.fill);
  const tool = useSelector((state) => state.boardReducer.tool);
  const mode = useSelector((state) => state.boardReducer.mode);
  const strokeWidth = useSelector((state) => state.boardReducer.strokeWidth);
  const strokeType = useSelector((state) => state.boardReducer.strokeType);

  const handleChangeStrokeColor = (changedColor) => {
    dispatch(setColor(changedColor));
  };
  const handleChangeFillColor = (changedColor) => {
    dispatch(setFill(changedColor));
  };
  const handleStrokeTypeChange = (event) => {
    dispatch(setStrokeType(event.target.value));
  };

  const toggleMode = (modeClicked) => {
    dispatch(setMode(modeClicked));
  };

  if (tool === TOOLS.SELECT.name) return <></>;

  return (
    <Wrapper display="flex" justifyConent="space-between" alignItems="center">
      {TOOLS[tool].modes &&
        TOOLS[tool].modes.map((modeItem) => (
          <Tooltip title={modeItem.label} key={modeItem.name} arrow>
            <ToggleButton
              mx={2}
              key={modeItem.name}
              value={modeItem.name}
              selected={mode === modeItem.name}
              onClick={() => toggleMode(modeItem.name)}
            >
              {modeItem.icon}
            </ToggleButton>
          </Tooltip>
        ))}
      {tool !== TOOLS.SELECT.name && (
        <>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1" color="textSecondary" ml={2}>
            Stroke
          </Typography>
          <Tooltip title="Stroke Color" arrow>
            <Box mx={2} mt="-3px">
              <ColorPicker
                value={color}
                onChange={handleChangeStrokeColor}
                hideTextfield
                palette={palette}
              />
            </Box>
          </Tooltip>
          <Typography variant="body1" color="textSecondary" mx={2}>
            Type
          </Typography>
          <Select value={strokeType} onChange={handleStrokeTypeChange}>
            <MenuItem value="LINEAR">Linear</MenuItem>
            <MenuItem value="DASH">Dash</MenuItem>
            <MenuItem value="DOT">Dot</MenuItem>
            <MenuItem value="DASHDOT">Dash Dot</MenuItem>
          </Select>
          <Box mx={2}>
            <SliderInput
              label="Width"
              width={80}
              min={tool === TOOLS.PEN.name ? 1 : 0}
              max={150}
              value={strokeWidth}
              setValue={(value) => dispatch(setStrokeWidth(value))}
            />
          </Box>
        </>
      )}
      {tool !== TOOLS.SELECT.name && tool !== TOOLS.PEN.name && (
        <>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1" color="textSecondary" ml={2}>
            Fill
          </Typography>
          <Tooltip title="Fill Color" arrow>
            <Box mx={2} mt="-3px">
              <ColorPicker
                value={fill}
                onChange={handleChangeFillColor}
                hideTextfield
                palette={palette}
              />
            </Box>
          </Tooltip>
        </>
      )}
    </Wrapper>
  );
};

export default Settingsbar;
