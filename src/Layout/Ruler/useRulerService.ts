import { useCallback, useContext, useEffect, MouseEvent } from 'react'
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

  // Ruler 点击事件，创建 guide line
  const createGuideLine = (e: MouseEvent<Element>) => {
    const lineVertical = !vertical
    // 鼠标到起始点的距离
    const offset = lineVertical ? e.nativeEvent.offsetX : e.nativeEvent.offsetY
    // 起始点数值
    const start = lineVertical ? layoutService.startPoint.x : layoutService.startPoint.y
    // 根据缩放率计算
    const value = Math.round(start + offset / scale + breadth)
    // 最终新辅助线的值
    const newLine = lineVertical ? { x: value, y: undefined } : { x: undefined, y: value }

    const lineList = layoutService.lines.concat(newLine)
    console.log(value, 1111111)

    console.log(newLine, lineList, layoutService.lines)
    layoutService.setLines([...lineList])
  }

  useEffect(() => {
    console.log(layoutService.lines, 4447777)
  }, [layoutService.lines])

  return {
    draw: drawCanvas,
    width: vertical ? breadth : width - breadth,
    height: vertical ? height - breadth : breadth,
    handleMouseOver: setRulerHoveredToTrue,
    handleMouseOut: setRulerHoveredToFalse,
    createGuideLine: createGuideLine
  }
}
