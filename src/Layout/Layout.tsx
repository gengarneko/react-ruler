import React from 'react'
import { jsx } from '@emotion/react'
import { LayoutStyle } from './Layout.style'
import { useLayoutService, LayoutService } from './useLayoutService'
import { useHoverRulerService, HoverRulerService } from './useHoverRulerService'
import { Ruler } from './Ruler/Ruler'
import { Guide } from './Guide/Guide'

// * --------------------------------------------------------------------------- interface

// 辅助线对象类型
export type LineType = { x: number; y: undefined } | { x: undefined; y: number }
export interface LayoutProps {
  // 容器宽度
  width: number
  // 容器高度
  height: number
  // 左上角的起始坐标
  startPoint?: {
    x: number
    y: number
  }
  // 缩放大小
  scale: number
  // 辅助线列表 getter
  lines: LineType[]
  // 辅助线列表 setter
  setLines: (lines: LineType[]) => void
  // 控件选项
  controls?: {
    // 显示辅助线
    showGuide?: boolean
    // 显示标尺
    showRuler?: boolean
  }
  // 刻度尺宽度
  breadth: number
}

// * --------------------------------------------------------------------------- component

/**
 * 标尺组件的布局容器
 *
 * 1. 挂载横纵两条刻度尺
 * 2. 显示辅助线
 * 3. 根据参数，创建全局服务
 *
 * @export
 * @param { LayoutProps } props
 * @return
 */
/** @jsx jsx */
export const Layout: React.FC<LayoutProps> = (props) => {
  const defaultVal = { startPoint: { x: 0, y: 0 } }
  // 注册顶层服务
  const layoutService = useLayoutService({ ...props, ...defaultVal })
  // 注册 Ruler 区域 hover 事件服务
  const hoverRulerService = useHoverRulerService()

  const {
    width,
    height,
    controls = {
      showGuide: true,
      showRuler: true
    },
    breadth
  } = layoutService
  const { showGuide, showRuler } = controls
  /**
   * NOTICE:
   *  这里包含了组件渲染和服务注册，原则上应拆分，这里为了减少层级关系所以这么组织
   *  组件渲染只和服务返回的数据有关
   *  return 后的数据只能是 layoutService 中的
   */
  return (
    <LayoutService.Provider value={layoutService}>
      <div
        css={LayoutStyle({
          color: '#eee',
          width,
          height,
          breadth
        })}
      >
        <div className='ruler-corner' />
        <HoverRulerService.Provider value={hoverRulerService}>
          {showRuler && <Ruler />}
          {showRuler && <Ruler vertical />}
          {showGuide && <Guide />}
        </HoverRulerService.Provider>
      </div>
    </LayoutService.Provider>
  )
}
