import { useEffect, useState } from "react";

type ScrambleProps = {
  scramble: string;
  width: string;
  height: string;
};

type Cube = {
  [key: string]: string[];
  U: string[];
  D: string[];
  F: string[];
  B: string[];
  L: string[];
  R: string[];
};

const Scramble = ({ scramble, width, height }: ScrambleProps) => {
  const initialCube: Cube = {
    U: Array(9).fill("white"),
    D: Array(9).fill("yellow"),
    F: Array(9).fill("green"),
    B: Array(9).fill("blue"),
    L: Array(9).fill("orange"),
    R: Array(9).fill("red"),
  };

  const [cube, setCube] = useState<Cube>(initialCube);

  const colorMap: { [key: string]: string } = {
    white: "bg-[#FFFFFF]",
    red: "bg-[#F22E2E]",
    green: "bg-[#00FF00]",
    orange: "bg-[#FFA500]",
    blue: "bg-[#1583FF]",
    yellow: "bg-[#FFFF00]",
  };

  const applyScramble = () => {
    const moves = scramble.split(" ");

    moves.forEach((move) => {
      if (move.length === 1) {
        rotateFace(move);
      } else if (move[1] === "'") {
        rotateFace(move[0], -1);
      } else if (move[1] === "2") {
        rotateFace(move[0]);
        rotateFace(move[0]);
      }
    });
  };

  const rotateFace = (face: string, direction = 1) => {
    const adjacent: { [key: string]: [string, number[]][] } = {
      U: [
        ["B", [0, 1, 2]],
        ["R", [0, 1, 2]],
        ["F", [0, 1, 2]],
        ["L", [0, 1, 2]],
      ],
      D: [
        ["F", [6, 7, 8]],
        ["R", [6, 7, 8]],
        ["B", [6, 7, 8]],
        ["L", [6, 7, 8]],
      ],
      F: [
        ["U", [6, 7, 8]],
        ["R", [0, 3, 6]],
        ["D", [2, 1, 0]],
        ["L", [8, 5, 2]],
      ],
      B: [
        ["U", [2, 1, 0]],
        ["L", [0, 3, 6]],
        ["D", [6, 7, 8]],
        ["R", [8, 5, 2]],
      ],
      L: [
        ["U", [0, 3, 6]],
        ["F", [0, 3, 6]],
        ["D", [0, 3, 6]],
        ["B", [8, 5, 2]],
      ],
      R: [
        ["U", [8, 5, 2]],
        ["B", [0, 3, 6]],
        ["D", [8, 5, 2]],
        ["F", [8, 5, 2]],
      ],
    };

    const rotateFaceArray = (faceArray: string[], direction: number) => {
      const result = faceArray.slice();
      const indices =
        direction === 1 ? [0, 1, 2, 5, 8, 7, 6, 3] : [0, 3, 6, 7, 8, 5, 2, 1];

      indices.forEach((index, idx) => {
        result[index] = faceArray[indices[(idx + 6) % 8]];
      });
      return result;
    };

    setCube((prevCube) => {
      const newCube = { ...prevCube };
      newCube[face] = rotateFaceArray(newCube[face], direction);

      const adj = adjacent[face];
      const temp = adj.map((edge) =>
        edge[1].map((idx) => newCube[edge[0]][idx])
      );

      for (let i = 0; i < adj.length; i++) {
        const src = temp[(i - direction + adj.length) % adj.length];
        adj[i][1].forEach((idx, j) => {
          newCube[adj[i][0]][idx] = src[j];
        });
      }

      return newCube;
    });
  };

  useEffect(() => {
    setCube(initialCube);
    applyScramble();
  }, [scramble]);

  const showScramble = () => {
    const renderSide = (side: string[]) => (
      <div
        className={`${width} ${height} grid grid-cols-3 m-[1px] gap-[1px] border-[1px] border-[#000000]`}
      >
        {side.map((color, colorIndex) => (
          <div
            key={colorIndex}
            className={`w-[1/3] h-[1/3] ${colorMap[color] || ""}`}
          ></div>
        ))}
      </div>
    );

    return (
      <div className="w-min-content flex flex-row items-center">
        {renderSide(cube.L)}
        <span className="flex flex-col">
          {renderSide(cube.U)}
          {renderSide(cube.F)}
          {renderSide(cube.D)}
        </span>
        {renderSide(cube.R)}
        {renderSide(cube.B)}
      </div>
    );
  };

  return (
    <div className="w-min-content flex justify-center items-center">
      {showScramble()}
    </div>
  );
};

export default Scramble;
