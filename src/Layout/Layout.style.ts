import { css } from '@emotion/react'

export const LayoutStyle = (style: { color: string; width: number; height: number; breadth: number }) => css`
  position: absolute;
  width: ${style.width}px;
  height: ${style.height}px;
  border: 2px dashed ${style.color};
  .ruler-corner {
    position: absolute;
    width: ${style.breadth}px;
    height: ${style.breadth}px;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0);
  }
  .ruler-canvas {
    position: absolute;
    box-sizing: border-box;
    pointer-events: auto;
    user-select: none;
    &.ruler-canvas-vertical {
      top: ${style.breadth}px;
      left: 0;
      border-right: 1px solid #c8cdd0;
    }
    &.ruler-canvas-horizontal {
      top: 0;
      left: ${style.breadth}px;
      border-bottom: 1px solid #c8cdd0;
    }
  }
  .ruler-guides-container {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
