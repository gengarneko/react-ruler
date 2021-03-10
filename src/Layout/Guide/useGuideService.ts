import { useContext, useEffect, useState } from 'react'
import { getServiceToken } from '../../utils/getServiceToken'
import { LayoutService } from '../useLayoutService'
import { HoverRulerService } from '../useHoverRulerService'
import { LineType } from '../Layout'

// 用于渲染的辅助线类型
export type RenderLineType = { uuid: string; value: number; vertical: boolean; length: number }

/**
 * 对顶部组件传下来的 lines 值进行处理
 *
 * @export
 * @return
 */
export const useGuideService = () => {
  // 注入上层服务
  const layoutService = useContext(LayoutService)
  // 注入 Ruler hover 事件服务
  const hoverRulerService = useContext(HoverRulerService)

  // 辅助线转换成方便渲染的数据格式
  const lineList = layoutService.lineList.map((line) =>
    packageLineData(line, layoutService.height, layoutService.width)
  )

  const [lines, setLines] = useState<RenderLineType[]>(() => lineList)

  /**
   * 超出边界的判断函数
   */
  const shouldBeDeleted = (value: number, lineVertical: boolean) => {
    const { startPoint, breadth, width, height } = layoutService
    if (lineVertical) {
      return value <= startPoint.x || value >= startPoint.x + width - breadth
    } else {
      return value <= startPoint.y || value >= startPoint.y + height - breadth
    }
  }

  useEffect(() => {
    layoutService.setLineList(lines.map((line) => unpackLineData(line)))
  }, [lines])

  return {
    start: layoutService.startPoint,
    shouldBeDeleted,
    // 缩放大小
    scale: layoutService.scale,
    // 标尺宽度
    breadth: layoutService.breadth,
    // 辅助线列表
    lineList,
    // 更新辅助线列表
    setLineList: setLines,
    // 允许操作辅助线
    allowLineEvent: hoverRulerService.isRulerHovered,
    // NOTICE: 避免层叠关系造成的选中问题，所以不能只监听 ruler 区域的鼠标事件
    handleMouseEnter: () => hoverRulerService.toggleRulerHovered(true),
    handleMouseLeave: () => hoverRulerService.toggleRulerHovered(false)
  }
}

/* 将这个服务注册到组件顶部 */
export const GuideService = getServiceToken(useGuideService)

// * --------------------------------------------------------------------------- utils

/**
 * 将辅助线包装成方便渲染的格式
 *
 * @export
 * @param { LineType } lineValue
 * @param { number } width
 * @param { number } height
 * @return
 */
export const packageLineData = (lineValue: LineType, width: number, height: number): RenderLineType => {
  return lineValue.x !== undefined
    ? {
        uuid: lineValue.key,
        value: lineValue.x,
        vertical: true,
        length: width
      }
    : {
        uuid: lineValue.key,
        value: lineValue.y,
        vertical: false,
        length: height
      }
}

/**
 * 将辅助线格式拆包
 *
 * @export
 * @param { RenderLineType } lineData
 * @return
 */
export const unpackLineData = (lineData: RenderLineType) => {
  return lineData.vertical
    ? { key: lineData.uuid, x: lineData.value, y: undefined }
    : { key: lineData.uuid, x: undefined, y: lineData.value }
}
