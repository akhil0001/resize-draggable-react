import React, { useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { DraggableContainer } from "./DraggableContainer";

const checkX = (positionX, width, parentWidth) =>
  positionX + width< parentWidth && positionX  > 0;
const checkY = (positionY, height, parentHeight) =>
  positionY + height < parentHeight && positionY  > 0;
export const Container = () => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 15, y: 15 });
  const ref = useRef();

  const { ref: containerRef, width = 0, height = 0 } = useResizeObserver();

  const onMouseMove = (event) => {
    if (pressed) {
      console.log(true);
      setPosition({
        x: checkX(
          position.x + event.movementX,
          ref.current?.offsetWidth,
          width
        )
          ? position.x + event.movementX
          : position.x,
        y: checkY(
          position.y + event.movementY,
          ref.current?.offsetHeight,
          height
        )
          ? position.y + event.movementY
          : position.y
      });
      return
    }
  };

  return (
    <>
      <div
      className="container"
      ref={containerRef}
      onMouseUp={() => {console.log('up detected'); setPressed(false)}}
      onMouseMove={onMouseMove}
      onMouseLeave={(event) => {
        event.stopPropagation();
        console.log('leave detercted');
        setPressed(false)
      }}
    >
   
       <DraggableContainer
        pressed={pressed}
        setPressed={setPressed}
        parentWidth={width}
        parentHeight={height}
        position={position}
        setPosition={setPosition}
        ref={ref}
      />
    </div>
    
    </>
  );
};
