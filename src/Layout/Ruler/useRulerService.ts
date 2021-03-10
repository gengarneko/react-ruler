import { useContext, useState, MouseEvent } from 'react'
import { drawRuler } from './utils/drawRuler'
import { useRatio } from '../../hooks/useRatio'
import { LayoutService } from '../useLayoutService'
import { HoverRulerService } from '../useHoverRulerService'
import { LineType } from '../Layout'
import { v4 as uuid } from 'uuid'

/**
 * 提供刻度尺组件的画布数据 & 绘制函数
 *
 * @export
 * @return { (ctx: CanvasRenderingContext2D) => void } draw
 * @return { number } draw
 */
export const useRulerService = () => {
  const [vertical, toggleVertical] = useState<boolean>(false)
  // 注入上层服务
  const layoutService = useContext(LayoutService)
  // 注入 Ruler hover 事件服务
  const hoverRulerService = useContext(HoverRulerService)
  // 分辨率
  const ratio = useRatio()
  const { width, height, scale, breadth, lineList, setLineList, startPoint } = layoutService

  // 绘制画布
  const drawCanvas = (ctx: CanvasRenderingContext2D) =>
    drawRuler({
      ctx,
      width,
      height,
      scale,
      ratio,
      vertical,
      startPos: startPoint
    })

  /**
   * 将 Ruler hover 的状态置 true
   */
  const setRulerHoveredToTrue = () => hoverRulerService.toggleRulerHovered(true)

  /**
   * 将 Ruler hover 的状态置 false
   */
  const setRulerHoveredToFalse = () => hoverRulerService.toggleRulerHovered(false)

  /**
   * 点击 Ruler，创建 guide line
   */
  const createGuideLine = (e: MouseEvent<Element>) => {
    const lineVertical = !vertical
    // 鼠标到起始点的距离
    const offset = lineVertical ? e.nativeEvent.offsetX : e.nativeEvent.offsetY
    // 起始点数值
    const start = lineVertical ? startPoint.x : startPoint.y
    // 根据缩放率计算
    const value = Math.round(start + offset / scale)
    // 添加辅助线
    const newLine: LineType = lineVertical
      ? { key: uuid(), x: value, y: undefined }
      : { key: uuid(), x: undefined, y: value }
    if (!lineList.includes(newLine)) {
      const newLineList = lineList.concat(newLine)
      setLineList([...newLineList])
    }
  }

  return {
    // 是否垂直
    vertical,
    // 设置垂直状态（用于组件初始化服务的 vertical 状态）
    toggleVertical,
    breadth: layoutService.breadth,
    draw: drawCanvas,
    // 刻度尺宽度
    width: vertical ? breadth - 1 : width - breadth,
    // 刻度尺高度
    height: vertical ? height - breadth : breadth - 1,
    handleMouseOver: setRulerHoveredToTrue,
    handleMouseOut: setRulerHoveredToFalse,
    createGuideLine: createGuideLine
  }
}
