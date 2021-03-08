import { css } from '@emotion/react'

export const GuideLineStyle = (style: { vertical: boolean; value: number; allowLineEvent: boolean }) => css`
  position: absolute;
  pointer-events: ${style.allowLineEvent ? 'auto' : 'none'};
  font-size: 12px;
  top: 0;
  left: 0;
  will-change: transform;
  transform: ${style.vertical ? `translateX(${style.value}px)` : `translateY(${style.value}px)`};
  .ruler-guide-line {
    color: palevioletred;
    position: absolute;
    cursor: ${style.vertical ? `ew-resize` : `ns-resize`};
    line-height: 0;
    display: flex;
    flex-direction: column;
  }
`
