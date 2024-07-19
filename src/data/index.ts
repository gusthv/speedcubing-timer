export const navlinks = [
  {
    title: "STATISTICS",
    url: "/statistics",
  },
  {
    title: "TIMER",
    url: "/",
  },
  {
    title: "SOLVES",
    url: "/solves",
  },
];

import {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
  ninth,
  tenth,
  eleventh,
} from "../assets";

import { AlgorithmCollection } from "../types";

export const algorithmList: AlgorithmCollection[] = [
  {
    pll: [
      {
        image: first,
        rotations: "R U2 R' U' R U' R'",
      },
      {
        image: second,
        rotations: "R U R' U R U' R' U R U2 R'",
      },
      {
        image: third,
        rotations: "F R' F' r U R U' r'",
      },
      {
        image: fourth,
        rotations: "R U2 R2 U' R2 U' R2 U2 R",
      },
      {
        image: fifth,
        rotations: "R U R' U R U2 R'",
      },
      {
        image: sixth,
        rotations: "r U R' U' r' F R F'",
      },
      {
        image: seventh,
        rotations: "R2 D R' U2 R D' R' U2 R'",
      },
    ],
    oll: [
      {
        image: eighth,
        rotations: "M2 U M2 U2 M2 U M2",
      },
      {
        image: ninth,
        rotations: "R U' R U R U R U' R' U' R2",
      },
      {
        image: tenth,
        rotations: "R2 U R U R' U' R' U' R' U R'",
      },
      {
        image: eleventh,
        rotations: "M' U M2 U M2 U M' U2 M2",
      },
    ],
  },
];
