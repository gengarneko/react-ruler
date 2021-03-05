import { useCallback, useContext } from 'react'
import { drawRuler } from './utils/drawRuler'
import { useRatio } from '../../hooks/useRatio'
import { LayoutService } from '../useLayoutService'
import { HoverRulerService } from '../useHoverRulerService'

/**
 * 提供刻度尺组件的画布数据 & 绘制函数
 *
 * @export
 * @param { boolean | undefined } vertical 竖直展现
 * @return { (ctx: CanvasRenderingContext2D) => void } draw
 * @return { number } draw
 * @return { number } draw
 */
export const useRulerService = (vertical?: boolean) => {
  // 注入上层服务
  const layoutService = useContext(LayoutService)
  // 注入 Ruler hover 事件服务
  const hoverRulerService = useContext(HoverRulerService)
  // 分辨率
  const ratio = useRatio()
  const { width, height, scale, breadth } = layoutService

  // 绘制画布
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
  // 将 Ruler hover 的状态置 true
  const setRulerHoveredToTrue = () => hoverRulerService.toggleRulerHovered(true)
  // 将 Ruler hover 的状态置 false
  const setRulerHoveredToFalse = () => hoverRulerService.toggleRulerHovered(false)

  return {
    draw: drawCanvas,
    width: vertical ? breadth : width - breadth,
    height: vertical ? height - breadth : breadth,
    handleMouseOver: setRulerHoveredToTrue,
    handleMouseOut: setRulerHoveredToFalse
  }
}
