import React from 'react'
import { jsx } from '@emotion/react'
import { LayoutStyle } from './Layout.style'
import { useLayoutService, LayoutService } from './useLayoutService'
import { Ruler } from './Ruler/Ruler'
import { Guide } from './Guide/Guide'

// * --------------------------------------------------------------------------- interface

export interface LayoutProps {
  // 宽度
  width: number
  // 高度
  height: number
  // 缩放大小
  scale: number
  // 辅助线列表 getter
  lines: ({ x: number; y: undefined } | { x: undefined; y: number })[]
  // 辅助线列表 setter
  setLines: (lines: ({ x: number; y: undefined } | { x: undefined; y: number })[]) => void
  // 控件选项
  controls?: {
    // 显示辅助线
    showGuide?: boolean
    // 显示标尺
    showRuler?: boolean
  }
  // 刻度尺高度
  rulerBreadth: number
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
  const {
    width,
    height,
    // scale,
    // lines,
    controls = {
      showGuide: true,
      showRuler: true
    },
    rulerBreadth
  } = props

  const layoutService = useLayoutService({ ...props })

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
          breadth: rulerBreadth
        })}
      >
        <div className='ruler-corner' />
        {controls.showRuler && <Ruler />}
        {controls.showRuler && <Ruler vertical />}
        {controls.showGuide && <Guide />}
      </div>
    </LayoutService.Provider>
  )
}
