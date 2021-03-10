import React from 'react'
import { css } from '@emotion/react'

// TODO: 删除按钮

// * --------------------------------------------------------------------------- style

const DeleteStyle = (style: { vertical: boolean; value: number; allowLineEvent: boolean; breadth: number }) => css`
  position: absolute;
  line-height: 1;
  top: ${style.vertical ? `${style.breadth}px` : `1px`};
  left: ${style.vertical ? `-20px` : `${style.breadth}px`};
  transform: ${style.vertical ? `rotate(0deg)` : `rotate(90deg)`};
`

// * --------------------------------------------------------------------------- component

/**
 * 辅助线删除按钮
 *
 * @param {}
 * @return
 */
export const DeleteButton: React.FC<{ className?: string; deleteGuideline: any; showDelete?: boolean }> = ({
  className,
  deleteGuideline,
  showDelete
}) => {
  return (
    <>
      {showDelete !== false && (
        <div css={DeleteStyle} onClick={deleteGuideline}>
          x
        </div>
      )}
    </>
  )
}
