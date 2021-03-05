import React from 'react'
import { useGuideService, GuideService } from './useGuideService'
import { calcLineData } from './utils/calcLineData'
import { GuideLine } from './GuideLine/GuideLine'

/**
 * 辅助线组件
 *
 * 数据转换的逻辑之所以写在渲染层
 * 是因为要借助 React 对数组 map key 的渲染优化减少不必要的渲染
 *
 * @export
 * @return
 */
export const Guide: React.FC = () => {
  const guideService = useGuideService()
  const { lines, verticalLength, horizontalLength, allowLineEvent, handleMouseOver } = guideService
  return (
    <GuideService.Provider value={guideService}>
      <div className='ruler-guides-container'>
        {lines.map((line) => {
          const val = calcLineData(line)
          return (
            <GuideLine
              key={val.key}
              value={val.value}
              vertical={val.vertical}
              length={val.vertical ? verticalLength : horizontalLength}
              allowLineEvent={allowLineEvent}
              onMouseOver={handleMouseOver}
            />
          )
        })}
      </div>
    </GuideService.Provider>
  )
}
