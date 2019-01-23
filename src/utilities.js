import { DIMENSIONS } from './const';

/**
 * shuffleArray
 *
 * Shuffles item from provided array and returns them as new array without mutating original one
 *
 * @param inputArray {Array} Array to be shuffled
 * @returns {Array}
 */
export function shuffleArray(inputArray) {
  const array = [...inputArray];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * getRandomInt
 *
 * Returns pseudo-random integer from provided range
 *
 * @param min {Number} minimal expected value
 * @param max {Number} maximal expected value
 * @returns {Number}
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * getRandomPositions
 *
 * Generates array of objects containing top and left properties with generated pseudo-random values
 *
 * @param length {Number}
 * @returns {Array}
 */
export function getRandomPositions(length) {
  const { pieceSize, drawerPadding: padding, width } = DIMENSIONS;

  return [...Array(length)].map(() => ({
    top: `${getRandomInt(padding, pieceSize / 2 - padding)}px`,
    left: `${getRandomInt(padding, width - pieceSize - padding)}px`,
  }));
}
