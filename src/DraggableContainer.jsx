import React, { useRef, useEffect, useLayoutEffect } from "react";

const isInRange = ({parentX, parentY, childX, childY}) => {
  console.log(childX >=0, 'x>0');
  console.log(childY >=0, 'y>0' );
  console.log(childX <= parentX, 'childX <= parentX');
  console.log(childY <= parentY, 'childY <= parentY');
 
 const flag = childX >=0 && childX <=parentX && childY >= 0 && childY <= parentY;

 return flag;
}
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

export const DraggableContainer = React.forwardRef(({
  setPressed,
  parentWidth,
  parentHeight,
  position,
  setPosition,
},ref) => {
  const prevParentDims = usePrevious({ parentWidth, parentHeight });

  useLayoutEffect(() => {
    if (prevParentDims == null) return;
    const { parentWidth: prevW, parentHeight: prevH } = prevParentDims;
    const deltaX = parentWidth - prevW;
    const deltaY = parentHeight - prevH;
    if (ref.current  && prevW !== 0 && prevH !== 0) {
    const newX = position.x + deltaX;
    const newY = position.y + deltaY;

    if(deltaX !== 0 || deltaY !== 0){
      setPosition({
        x: newX < 0 || newX+ ref.current.offsetWidth > parentWidth ? 0 : newX,
        y: newY < 0 || newY + ref.current.offsetHeight > parentHeight ? 0 : newY
      })
    }

      // let newX = position.x + deltaX* widthRatio
      // if(newX <= 0){
      //   newX = 0;
      // }
      // else if(newX >= parentWidth){
      //   console.log('over')
      //   newX = position.x - deltaX* widthRatio
      // }
      // setPosition({
      //   x: newX,
      //   y: position.y + deltaY
      // });
    }
  }, [parentHeight, parentWidth, prevParentDims, position]);

  // Monitor changes to position state and update DOM
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position, parentWidth]);
  // Update the current position if mouse is down

  return (
    <div
      ref={ref}
      style={quickAndDirtyStyle}
      onMouseDown={() => setPressed(true)}
    >
    <p style={{left: position.x, right: position.y}}>{position.x},{position.y}</p>
    </div>
  );
});
