import React from 'react'
import { css, jsx } from '@emotion/react'
import { useLayoutService, LayoutService } from './useLayoutService'
import { useHoverRulerService, HoverRulerService } from './useHoverRulerService'
import { Ruler } from './Ruler/Ruler'
import { Guide } from './Guide/Guide'
import { Corner } from './Corner/Corner'

// * --------------------------------------------------------------------------- style

export const LayoutStyle = (style: { color: string; width: number; height: number; breadth: number }) => css`
  position: absolute;
  width: ${style.width}px;
  height: ${style.height}px;
  border: 2px dashed ${style.color};
`

// * --------------------------------------------------------------------------- interface

// 辅助线对象类型
export type LineType = { key: string; x: number; y: undefined } | { key: string; x: undefined; y: number }
export interface LayoutProps {
  // 容器宽度
  width: number
  // 容器高度
  height: number
  // 左上角的起始坐标
  startPoint: {
    x: number
    y: number
  }
  // 缩放大小
  scale: number
  // 辅助线列表 getter
  lineList: LineType[]
  // 辅助线列表 setter
  setLineList: (lines: LineType[]) => void
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
  // 注册顶层服务
  const layoutService = useLayoutService({ ...props })
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
        <Corner breadth={breadth} />
        <HoverRulerService.Provider value={hoverRulerService}>
          {showRuler && <Ruler />}
          {showRuler && <Ruler vertical />}
          {showGuide && <Guide />}
        </HoverRulerService.Provider>
      </div>
    </LayoutService.Provider>
  )
}
