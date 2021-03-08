import React, { useEffect, useRef, useMemo } from 'react'
import { useRulerService } from './useRulerService'

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
export const Ruler: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const ref = useRef() as React.MutableRefObject<HTMLCanvasElement>
  const rulerService = useRulerService(vertical)
  const { draw, width, height } = rulerService

  useEffect(() => {
    if (ref?.current) {
      const ctx = ref.current.getContext('2d')
      ctx && draw(ctx)
    }
  }, [ref])

  return useMemo(() => {
    return (
      <>
        <>{console.log('------------ ruler render -----------')}</>
        <canvas
          className={`ruler-canvas ruler-canvas-${vertical ? 'vertical' : 'horizontal'}`}
          ref={ref}
          width={width}
          height={height}
          onMouseDown={rulerService.createGuideLine}
          onMouseOver={rulerService.handleMouseOver}
          onMouseOut={rulerService.handleMouseOut}
        />
      </>
    )
  }, [ref, width, height])
}
