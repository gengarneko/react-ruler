import React, { useEffect, useRef } from 'react'
import { useRulerService } from './useRulerService'
import { jsx, css } from '@emotion/react'

// * --------------------------------------------------------------------------- style

const RulerStyle = (style: { breadth: number; vertical: boolean }) => css`
  position: absolute;
  box-sizing: border-box;
  pointer-events: auto;
  user-select: none;
  top: ${style.vertical ? `${style.breadth}px` : `0`};
  left: ${style.vertical ? `0` : `${style.breadth}px`};
  border-right: ${style.vertical ? `1px solid #c8cdd0` : ``};
  border-bottom: ${style.vertical ? `` : `1px solid #c8cdd0`};
`

// * --------------------------------------------------------------------------- component

/**
 * 刻度尺组件
 *
 * 负责实时展现刻度 & 创建辅助线
 *
 * @export
 * @param { boolean } vertical 竖直展现
 * @return
 */
/** @jsx jsx */
export const Ruler: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const ref = useRef() as React.MutableRefObject<HTMLCanvasElement>
  const rulerService = useRulerService()

  useEffect(() => {
    rulerService.toggleVertical(vertical ?? false)
  }, [vertical])

  useEffect(() => {
    if (ref?.current) {
      const ctx = ref.current.getContext('2d')
      ctx && rulerService.draw(ctx)
    }
  }, [ref, rulerService])

  return (
    <canvas
      css={RulerStyle({ breadth: rulerService.breadth, vertical: vertical || false })}
      ref={ref}
      width={rulerService.width}
      height={rulerService.height}
      onMouseDown={rulerService.createGuideLine}
      onMouseOver={rulerService.handleMouseOver}
      onMouseOut={rulerService.handleMouseOut}
    />
  )
}
