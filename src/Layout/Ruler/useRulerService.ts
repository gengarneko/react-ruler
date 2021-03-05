import { useCallback, useContext } from 'react'
import { drawRuler } from './utils/drawRuler'
import { useRatio } from '../../hooks/useRatio'
import { LayoutService } from '../useLayoutService'

/**
 * 提供刻度尺组件的画布数据 & 绘制函数
 *
 * @export
 * @param { boolean | undefined } vertical 竖直展现
 * @return { (ctx: CanvasRenderingContext2D) => void } draw
 * @return { number } draw
 * @return { number } draw
 */
export const useRulerService = (
  vertical?: boolean
): {
  draw: (ctx: CanvasRenderingContext2D) => void
  width: number
  height: number
} => {
  // 注入上层服务
  const layoutService = useContext(LayoutService)
  // 分辨率
  const ratio = useRatio()
  const { width, height, scale, breadth } = layoutService

  const drawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D) =>
      drawRuler({
        ctx,
        width,
        height,
        scale,
        ratio,
        vertical
      }),
    []
  )
  return {
    draw: drawCanvas,
    width: vertical ? breadth : width - breadth,
    height: vertical ? height - breadth : breadth
  }
}
