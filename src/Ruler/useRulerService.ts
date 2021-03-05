import { drawRuler } from './utils/drawRuler'
import { useRatio } from './useRatio'
import { useCallback } from 'react'
/**
 * 提供刻度尺组件的画布数据 & 绘制函数
 *
 * @return { (ctx: CanvasRenderingContext2D) => void } draw
 * @return { number } draw
 * @return { number } draw
 */
export const useRulerService = (): {
  draw: (ctx: CanvasRenderingContext2D) => void
  width: number
  height: number
} => {
  const width = 800
  const height = 20
  const scale = 1
  const ratio = useRatio()

  const obj = {
    width,
    height,
    scale,
    ratio,
    direction: 'horizontal' as 'vertical' | 'horizontal'
  }
  const drawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D) => drawRuler({ ...obj, ctx }),
    [obj]
  )
  return { draw: drawCanvas, width, height: 400 }
}
