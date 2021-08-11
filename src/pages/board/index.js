import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import socket from "utils/socket";
import styled from "styled-components/macro";
import { Stage, Layer } from "react-konva";

import { Box } from "@material-ui/core";

import Toolbar from "./Toolbar";
import Settingsbar from "./Settingsbar";
import { TOOLS, MODES } from "../../constants";
import { Pen, Line, Rect, Circle } from "../../utils/shapes";

const Wrapper = styled(Box)`
  background-color: ${(props) => props.background};
`;

const Board = () => {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);

  const shapesRef = useRef([]);

  const isDrawing = useRef(false);
  const currentColor = useSelector((state) => state.boardReducer.color);
  const currentFill = useSelector((state) => state.boardReducer.fill);
  const currentTool = useSelector((state) => state.boardReducer.tool);
  const currentMode = useSelector((state) => state.boardReducer.mode);
  const frameSize = useSelector((state) => state.boardReducer.frameSize);
  const strokeWidth = useSelector((state) => state.boardReducer.strokeWidth);
  const strokeType = useSelector((state) => state.boardReducer.strokeType);

  const broadcastDrawShape = (shape) => {
    socket.emit("draw_shape", shape);
  };
  const broadcastModifyShape = (point) => {
    socket.emit("modify_shape", point);
  };

  const onReset = () => {
    shapesRef.current = [];
    setShapes(shapesRef.current.concat());
  };

  const addShape = (shape) => {
    if (!shapesRef.current.find((item) => item.id === shape.id)) {
      switch (shape.type) {
        case MODES.PEN.name:
          shapesRef.current.push(new Pen(shape));
          break;
        case MODES.LINE.name:
          shapesRef.current.push(new Line(shape));
          break;
        case MODES.RECT.name:
          shapesRef.current.push(new Rect(shape));
          break;
        case MODES.CIRCLE.name:
          shapesRef.current.push(new Circle(shape));
          break;
        default:
          break;
      }
      setShapes(shapesRef.current.concat());
    } else {
      console.log("%%%%%%%%%Duplicated%%%%%");
    }
  };

  const modifyShape = (info) => {
    let index = shapesRef.current.findIndex((item) => item.id === info.id);

    if (index === -1) {
      console.log("Not Found!", shapesRef.current, info);
      return;
    }
    shapesRef.current[index].modifyPoints(info.point);
    setShapes(shapesRef.current.concat());
  };

  useEffect(() => {
    socket.on("draw_shape", (shape) => {
      console.log("From Socket", shapesRef.current);
      addShape(shape);
    });
    socket.on("modify_shape", modifyShape);
    socket.on("reset", onReset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    const strokeColor =
      currentColor && currentColor.css
        ? currentColor.css.backgroundColor
        : currentColor;
    const fillColor =
      currentFill && currentFill.css
        ? currentFill.css.backgroundColor
        : currentFill;

    if (currentTool !== TOOLS.SELECT.name) {
      const shape = {
        id: uuidv4(),
        type: currentMode,
        points: [pos.x, pos.y],
        color: strokeColor,
        fill: fillColor,
        strokeWidth: strokeWidth,
        strokeType: strokeType,
      };
      setCurrentShape(shape);
      addShape(shape);
      broadcastDrawShape(shape);
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (currentTool !== TOOLS.SELECT.name) {
      if (currentShape) {
        const action = {
          id: currentShape.id,
          type: currentShape.type,
          point: point,
        };
        modifyShape(action);
        broadcastModifyShape(action);
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setCurrentShape(null);
  };

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <Settingsbar />
      <Wrapper
        width="100%"
        background="#282828"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex="1 1 0"
        overflow="auto"
      >
        <Wrapper
          width={frameSize.width}
          height={frameSize.height}
          background="white"
        >
          <Stage
            width={frameSize.width}
            height={frameSize.height}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
          >
            <Layer>{shapes.map((shape) => shape.render())}</Layer>
          </Stage>
        </Wrapper>
      </Wrapper>
      <Toolbar socket={socket} onReset={onReset} />
    </Box>
  );
};

export default Board;
