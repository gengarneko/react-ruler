import React from 'react'
import { jsx, css } from '@emotion/react'

// * --------------------------------------------------------------------------- style

const NumberStyle = (style: { vertical: boolean; breadth: number }) => css`
  pointer-events: none;
  user-select: none;
  line-height: 1;
  padding: 2px;
  position: absolute;
  color: #ffffff;
  background-color: palevioletred;
  transform: scale(0.875);
  top: ${style.vertical ? `${style.breadth * 0.875}px` : `-1px`};
  left: ${style.vertical ? `-1px` : `${style.breadth * 0.875}px`};
`

// * --------------------------------------------------------------------------- component

/**
 * 辅助线数值显示区域
 *
 * @param {}
 * @return
 */
/** @jsx jsx */
export const NumberBlock: React.FC<{
  number: number
  showNumber?: boolean
  breadth: number
  vertical?: boolean
}> = ({ number, showNumber, breadth, vertical }) => {
  return <>{showNumber !== false && <div css={NumberStyle({ vertical: vertical || false, breadth })}>{number}</div>}</>
}
