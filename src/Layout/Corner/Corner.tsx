import React from 'react'
import { jsx, css } from '@emotion/react'

// * --------------------------------------------------------------------------- style

const CornerStyle = (style: { breadth: number }) => css`
  position: absolute;
  width: ${style.breadth}px;
  height: ${style.breadth}px;
  top: 0;
  left: 0;
  //background-color: #c8cdd0;
  border-right: 1px solid #c8cdd0;
  border-bottom: 1px solid #c8cdd0;
  box-sizing: border-box;
`

// * --------------------------------------------------------------------------- component

/**
 * 角落组件
 *
 * @param {}
 * @return
 */
/** @jsx jsx */
export const Corner: React.FC<{ breadth: number }> = ({ breadth }) => {
  return <div css={CornerStyle({ breadth })} />
}
