import {
  DIMENSIONS,
  ENDGAME_DURATION,
  ERROR_COLOR_DURATION,
  ERROR_TIME_COST,
  TIMER_REFRESH_FREQUENCY,
} from './const';

describe('ensure provided editable constants are valid', () => {
  const {
    pieceSize, rows, separator, border,
  } = DIMENSIONS;

  test('pieceSize and rows', () => {
    expect(Number.isInteger(pieceSize))
      .toBe(true);
    expect(Number.isInteger(rows))
      .toBe(true);
    expect(pieceSize)
      .toBeGreaterThan(30);
    expect(rows)
      .toBeGreaterThanOrEqual(2);
    expect(pieceSize * rows)
      .toBeLessThanOrEqual(1000);
  });

  test('separator', () => {
    expect(Number.isInteger(separator))
      .toBe(true);
    expect(separator)
      .toBeGreaterThanOrEqual(0);
    expect(separator)
      .toBeLessThanOrEqual(5);
  });

  test('border', () => {
    expect(Number.isInteger(border))
      .toBe(true);
    expect(border)
      .toBeGreaterThanOrEqual(0);
    expect(border)
      .toBeLessThanOrEqual(10);
  });

  test('time values', () => {
    const timeValues = [
      ENDGAME_DURATION,
      TIMER_REFRESH_FREQUENCY,
      ERROR_TIME_COST,
      ERROR_COLOR_DURATION,
    ];

    timeValues.forEach((time) => {
      expect(Number.isInteger(time))
        .toBe(true);
      expect(time)
        .toBeGreaterThanOrEqual(0);
    });
  });
});
