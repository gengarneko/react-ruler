import React, { useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import { useGuideLineService, GuideLineService } from './useGuideLineService'
import { NumberBlock } from './component/NumberBlock'

// * --------------------------------------------------------------------------- style

export const GuideLineStyle = (style: {
  start: number
  vertical: boolean
  value: number
  allowLineEvent: boolean
  breadth: number
}) => css`
  position: absolute;
  pointer-events: ${style.allowLineEvent ? 'auto' : 'none'};
  font-size: 12px;
  top: 0;
  left: 0;
  will-change: transform;
  transform: ${style.vertical
    ? `translateX(${style.value + style.breadth - style.start}px)`
    : `translateY(${style.value + style.breadth - style.start}px)`};
  .ruler-guide-line {
    color: palevioletred;
    position: absolute;
    cursor: ${style.vertical ? `ew-resize` : `ns-resize`};
    line-height: 0;
    display: flex;
    flex-direction: column;
  }
`

// * --------------------------------------------------------------------------- component

/**
 * 辅助线组件
 *
 * @export
 * @param { string } key 唯一标识符
 * @return
 */
/** @jsx jsx */
export const GuideLine: React.FC<{ uuid: string }> = (props) => {
  const guideLineService = useGuideLineService()

  useEffect(() => {
    guideLineService.setUuid(props.uuid)
  }, [props, guideLineService])

  return (
    <>
      {guideLineService.number !== undefined && (
        <GuideLineService.Provider value={guideLineService}>
          <div
            css={GuideLineStyle({
              start: guideLineService.start,
              vertical: guideLineService.vertical,
              value: guideLineService.number,
              allowLineEvent: guideLineService.allowLineEvent,
              breadth: guideLineService.breadth
            })}
            onMouseEnter={guideLineService.handleMouseEnter}
            onMouseLeave={guideLineService.handleMouseLeave}
            onMouseDown={guideLineService.handleMouseDown}
          >
            <div className='ruler-guide-line'>
              <svg
                width={guideLineService.svgWidth}
                height={guideLineService.svgHeight}
                style={{ backgroundColor: 'palevioletred' }}
              />
            </div>
            <NumberBlock
              number={guideLineService.number}
              breadth={guideLineService.breadth}
              vertical={guideLineService.vertical}
            />
          </div>
        </GuideLineService.Provider>
      )}
    </>
  )
}
