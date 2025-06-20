import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const grid = 20;
function App() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startIndex, setStartIndex] = useState({
    x: "a",
    y: "a",
  });
  const [endIndex, setEndIndex] = useState({
    x: "b",
    y: "b",
  });

  const initialRender = useRef(true);

  const grids = [];
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      grids.push(
        <div
          draggable={false}
          id={`${i},${j}`}
          className="grid-cells"
          key={`grid${i + j}${j}`}
        ></div>
      );
    }
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsMouseDown(true);
    const element = event.target as HTMLDivElement;
    const [x, y] = element.id.split(",");
    setStartIndex({ x, y });
    setEndIndex({ x: "a", y: "a" });
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsMouseDown(false);
    const element = event.target as HTMLDivElement;
    const [x, y] = element.id.split(",");
    setEndIndex({ x, y });
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (!isMouseDown) return;
    const [x, y] = (event.target as HTMLDivElement).id.split(",");
    setEndIndex({ x, y });
  };

  const getCondition = (x: number, y: number): boolean => {
    const minX = Math.min(+startIndex.x, +endIndex.x);
    const maxX = Math.max(+startIndex.x, +endIndex.x);
    const minY = Math.min(+startIndex.y, +endIndex.y);
    const maxY = Math.max(+startIndex.y, +endIndex.y);

    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    document.querySelectorAll(".grid-cells").forEach((value: Element) => {
      const [elementx, elementy] = value.id.split(",");

      if (getCondition(+elementx, +elementy)) {
        (value as HTMLDivElement).style.backgroundColor = "pink";
      } else {
        (value as HTMLDivElement).style.backgroundColor = "white";
      }
    });
  }, [isMouseDown, endIndex]);

  return (
    <div className="main-body" draggable={false}>
      <div
        className="grid-wrapper"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseEnter}
      >
        {grids.map((grid) => grid)}
      </div>
    </div>
  );
}

export default App;
