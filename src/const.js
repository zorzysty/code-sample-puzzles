export const ENDGAME_DURATION = 5000;
export const TIMER_REFRESH_FREQUENCY = 77;
export const ERROR_TIME_COST = 5000;
export const ERROR_COLOR_DURATION = 300;

const pieceSize = 180;
const rows = 3;
const separator = 2;
const border = 3;

/* do not edit below */
const drawerHeightFactor = 1.6;
const drawerPadding = 20;
const columns = rows;
const pieceCount = columns * rows;
const width = (pieceSize * columns) + ((columns - 1) * separator) + (2 * border);

export const DIMENSIONS = {
  columns,
  rows,
  separator,
  border,
  pieceSize,
  drawerHeightFactor,
  drawerPadding,
  pieceCount,
  width,
};
