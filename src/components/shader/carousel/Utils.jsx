// src/shade/carousel/utils.js
export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const getPiramidalIndex = (items, active) => {
  return [...Array(items.length).keys()].map((i) =>
    Math.abs(i - active)
  );
};
