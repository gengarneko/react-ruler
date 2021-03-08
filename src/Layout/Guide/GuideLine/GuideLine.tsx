import React from 'react'
import { jsx } from '@emotion/react'
import { GuideLineStyle } from './GuideLine.style'
// import { useGuideLineService } from './useGuideLineService'

// * --------------------------------------------------------------------------- interface

export interface GuideLineProps {
  // 唯一标识符
  key: string
  // 数值
  value: number
  // 长度
  length: number
  // 是否竖线
  vertical: boolean
  // 是否允许操作 guide lines
  allowLineEvent: boolean
  // NOTICE: 避免层叠关系造成的选中问题
  onMouseOver: () => void
  onMouseOut: () => void
}

// * --------------------------------------------------------------------------- component

/**
 * 辅助线组件
 *
 * @export
 * @param { GuideLine } props
 * @return
 */
/** @jsx jsx */
export const GuideLine: React.FC<GuideLineProps> = (props) => {
  // const guideLineService = useGuideLineService()
  const { value, length, vertical, allowLineEvent, onMouseOver, onMouseOut } = props
  return (
    <div css={GuideLineStyle({ vertical, value, allowLineEvent })} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <div className='ruler-guide-line'>
        <svg
          width={vertical ? 1 : length}
          height={vertical ? length : 1}
          style={{ backgroundColor: 'palevioletred' }}
        />
      </div>
    </div>
  )
}
