import React from 'react'
import { useGuideService, GuideService } from './useGuideService'
import { GuideLine } from './GuideLine/GuideLine'

import { jsx, css } from '@emotion/react'

// * --------------------------------------------------------------------------- style

const GuideStyle = css`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
`

// * --------------------------------------------------------------------------- component

/**
 * 辅助线组件
 *
 * 数据转换的逻辑之所以写在渲染层
 * 是因为要借助 React 对数组 map key 的渲染优化减少不必要的渲染
 *
 * @export
 * @return
 */
/** @jsx jsx */
export const Guide: React.FC = () => {
  const guideService = useGuideService()

  return (
    <GuideService.Provider value={guideService}>
      <div css={GuideStyle}>
        {guideService.lineList.map((line) => line.uuid && <GuideLine key={line.uuid} uuid={line.uuid} />)}
      </div>
    </GuideService.Provider>
  )
}
