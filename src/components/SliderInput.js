import React from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Slider,
  Tooltip,
  Box,
  Typography as MuiTypography,
  Input,
} from "@material-ui/core";
const Typography = styled(MuiTypography)(spacing);

const SliderInput = (props) => {
  const { label, min, max, value, setValue, width } = props;
  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="body1" color="textSecondary" mr={2}>
        {label}
      </Typography>
      <Box width={width} mx={2}>
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={(event, value) => setValue(value)}
          aria-labelledby="shape-size"
          ValueLabelComponent={(props) => (
            <Tooltip
              open={props.open}
              enterTouchDelay={0}
              placement="top"
              title={props.value}
            >
              {props.children}
            </Tooltip>
          )}
        />
      </Box>
      <Input
        value={value}
        margin="dense"
        onChange={(event) =>
          setValue(event.target.value === "" ? 1 : Number(event.target.value))
        }
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: min,
          max: max,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </Box>
  );
};

export default SliderInput;
