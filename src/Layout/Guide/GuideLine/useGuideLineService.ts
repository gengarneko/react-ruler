import React, { useState, useContext, useEffect } from 'react'
import { GuideService } from '../useGuideService'
import { LayoutService } from '../../useLayoutService'
import { getServiceToken } from '../../../utils/getServiceToken'

/**
 * 辅助线组件的逻辑
 */
export const useGuideLineService = () => {
  // 通过 key 连接上层服务
  const [uuid, setUuid] = useState('')
  // 辅助线数值
  const [number, setNumber] = useState<number | undefined>()
  // 注入上层逻辑
  const guideService = useContext(GuideService)
  const layoutService = useContext(LayoutService)
  // 找到当前渲染成员
  const currentLine = guideService.lineList.find((line) => line.uuid === uuid) || {
    uuid: '',
    value: undefined,
    vertical: false,
    length: 0
  }
  const { vertical } = currentLine

  useEffect(() => {
    if (currentLine.value) setNumber(currentLine.value)
  }, [currentLine.value])

  // 更新当前成员
  const updateLine = (value: number) => {
    const result = guideService.lineList.map((line) => {
      if (line.uuid === currentLine?.uuid) {
        return { ...line, value }
      } else {
        return line
      }
    })
    guideService.setLineList(result)
  }

  // 删除当前成员
  const deleteLine = () => {
    const result = guideService.lineList.filter((line) => line.uuid !== currentLine.uuid)
    guideService.setLineList(result)
  }

  // 拖拽逻辑，监听 down 事件
  // TODO：拖拽逻辑应该和 model 的 CRUD 分离，抽出来
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!currentLine.value) {
      return undefined
    }
    const { vertical, value } = currentLine
    const startD = vertical ? e.clientX : e.clientY
    // onMouseDown()
    const onMove = (e: any) => {
      const currentD = vertical ? e.clientX : e.clientY
      const newValue = Math.round(value + (currentD - startD) / guideService.scale)
      setNumber(newValue)
      const isBeyondBoundary = guideService.shouldBeDeleted(newValue, vertical)
      if (isBeyondBoundary) {
        deleteLine()
        document.removeEventListener('mousemove', onMove)
        document.body.style.cursor = 'default'
      }
      // 拖拽的时候光标不变
      document.body.style.cursor = vertical ? 'ew-resize' : 'ns-resize'
    }
    const onEnd = (e: any) => {
      const currentD = vertical ? e.clientX : e.clientY
      const newValue = Math.round(value + (currentD - startD) / guideService.scale)
      // 判断边界，进行删除或更新操作
      // releaseGuide(index, vertical, newValue)
      const isBeyondBoundary = guideService.shouldBeDeleted(newValue, vertical)
      if (!isBeyondBoundary) updateLine(newValue)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
      document.body.style.cursor = 'default'
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)
    return undefined
  }

  const length = vertical ? layoutService.height : layoutService.width
  const start = vertical ? layoutService.startPoint.x : layoutService.startPoint.y
  return {
    start,
    // 数值
    number,
    // 初始化 uuid
    setUuid,
    breadth: layoutService.breadth,
    // 是否垂直
    vertical,
    // 辅助线长度
    length,
    // svg 宽度
    svgWidth: vertical ? 1 : length,
    // svg 高度
    svgHeight: vertical ? length : 1,
    // 是否可以操作
    allowLineEvent: guideService.allowLineEvent,
    // 鼠标按住
    handleMouseDown,
    // 添加 hover 事件
    handleMouseEnter: guideService.handleMouseEnter,
    // 移除 hover 事件
    handleMouseLeave: guideService.handleMouseLeave
  }
}

// 聚焦逻辑 —— 只暴露当前已选中项给子组件，当前模块只修改这部分逻辑
export const GuideLineService = getServiceToken(useGuideLineService)
