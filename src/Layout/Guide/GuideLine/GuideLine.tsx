import React from 'react'
import { jsx, css } from '@emotion/react'
import { useGuideLineService } from './useGuideLineService'

// * --------------------------------------------------------------------------- interface

export interface GuideLineProps {
  key: string
  value: number
  length: number
  vertical: boolean
}
// * --------------------------------------------------------------------------- style

/** @jsx jsx */
const GuideLineWrapper = (style: { vertical: boolean; value: number }) => css`
  position: absolute;
  pointer-events: none;
  font-size: 12px;
  top: 0;
  left: 0;
  will-change: transform;
  transform: ${style.vertical ? `translateX(${style.value}px)` : `translateY(${style.value}px)`};
`

const GuideLineStyle = css`
  color: palevioletred;
  color: #fce1e5;
  position: absolute;
  cursor: ns-resize;
  line-height: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
`

// * --------------------------------------------------------------------------- component

/**
 * 辅助线组件
 *
 * @export
 * @param { GuideLine } props
 * @return
 */
export const GuideLine: React.FC<GuideLineProps> = (props) => {
  const guideLineService = useGuideLineService()
  const { value, length, vertical } = props

  console.log(guideLineService)

  return (
    <div css={GuideLineWrapper({ vertical, value })}>
      <div css={GuideLineStyle}>
        <svg
          width={vertical ? 1 : length}
          height={vertical ? length : 1}
          style={{ backgroundColor: 'palevioletred' }}
        />
      </div>
    </div>
  )
}
