import React, { useState } from "react";
import useResizeObserver from "use-resize-observer";
import { DraggableContainer } from "./DraggableContainer";

export const Container = () => {
  const [pressed, setPressed] = useState(false);

  const { ref: containerRef, width = 1, height = 1 } = useResizeObserver();

  return (
    <div
      className="container"
      ref={containerRef}
      onMouseUp={() => setPressed(false)}
    >
      I am a container of width: {width} and height={height}
      <DraggableContainer
        pressed={pressed}
        setPressed={setPressed}
        parentWidth={width}
        parentHeight={height}
      />
    </div>
  );
};
