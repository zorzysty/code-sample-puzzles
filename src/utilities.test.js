import { shuffleArray, getRandomInt, getRandomPositions } from './utilities';
import { DIMENSIONS } from './const';


describe('utilities', () => {
  test('getRandomInt', () => {
    const ranges = [
      [0, 2],
      [2, 2],
      [1, 8],
    ];

    expect(getRandomInt(0, 0)).toBe(0);

    ranges.forEach((range) => {
      expect(getRandomInt(range[0], range[1])).toBeGreaterThanOrEqual(range[0]);
      expect(getRandomInt(range[0], range[1])).toBeLessThanOrEqual(range[1]);
      expect(typeof getRandomInt(range[0], range[1])).toBe('number');
      expect(Number.isInteger(getRandomInt(range[0], range[1]))).toBe(true);
    });
  });

  test('shuffleArray', () => {
    const arrays = [
      [1, 2, 3],
      [],
      [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
    ];

    arrays.forEach((array) => {
      const result = shuffleArray(array);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(array.length);
      array.forEach((item) => {
        expect(result).toContain(item);
      });
    });
  });

  test('getRandomPositions', () => {
    const lengths = [0, 4, 50];
    const { pieceSize, drawerPadding, width } = DIMENSIONS;

    lengths.forEach((length) => {
      const result = getRandomPositions(length);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(length);

      result.forEach((position) => {
        expect(typeof position).toBe('object');
        expect(typeof position).not.toEqual(null);

        expect(position).toHaveProperty('top');
        expect(position).toHaveProperty('left');

        const leftValue = +position.left.slice(0, -2);
        const topValue = +position.top.slice(0, -2);

        expect(topValue).toBeGreaterThanOrEqual(drawerPadding);
        expect(topValue).toBeLessThanOrEqual(pieceSize / 2 - drawerPadding);

        expect(leftValue).toBeGreaterThanOrEqual(drawerPadding);
        expect(leftValue).toBeLessThanOrEqual(width - pieceSize - drawerPadding);
      });
    });
  });
});
