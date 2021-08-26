import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

const checkX = (positionX, width, parentWidth) =>
  positionX + width < parentWidth;
const checkY = (positionY, height, parentHeight) =>
  positionY + height < parentHeight;

const quickAndDirtyStyle = {
  width: "200px",
  height: "200px",
  background: "#FF9900",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab"
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const DraggableContainer = ({
  pressed,
  setPressed,
  parentWidth,
  parentHeight
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prevParentDims = usePrevious({ parentWidth, parentHeight });
  const ref = useRef();

  useLayoutEffect(() => {
    if (prevParentDims == null) return;
    const { parentWidth: prevW, parentHeight: prevH } = prevParentDims;
    const deltaX = parentWidth - prevW;
    const deltaY = parentHeight - prevH;
    if (ref.current && deltaX !== 0 && prevW !== 1 && prevH !== 1) {
      console.log({ prevW, deltaX });
      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY
      });

      ref.current.style.transform = `translate(${position.x + deltaX}px, ${
        position.y + deltaY
      }px)`;
    }
  }, [parentHeight, parentWidth, prevParentDims, position]);

  // Monitor changes to position state and update DOM
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position, parentWidth]);
  // Update the current position if mouse is down
  const onMouseMove = (event) => {
    if (pressed) {
      console.log();
      setPosition({
        x: checkX(
          position.x + event.movementX,
          ref.current?.offsetWidth,
          parentWidth
        )
          ? position.x + event.movementX
          : position.x,
        y: checkY(
          position.y + event.movementY,
          ref.current?.offsetHeight,
          parentHeight
        )
          ? position.y + event.movementY
          : position.y
      });
    }
  };

  return (
    <div
      ref={ref}
      style={quickAndDirtyStyle}
      onMouseMove={onMouseMove}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <p>{pressed ? "Dragging..." : "Press to drag"}</p>
    </div>
  );
};
