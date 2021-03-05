import React, { useEffect, useRef } from 'react'
import { jsx, css } from '@emotion/react'
import { useRulerService } from './useRulerService'

// * --------------------------------------------------------------------------- style

/** @jsx jsx */
const RulerStyle = css`
  border: 2px dashed plum;
  font-size: 2em;
  text-align: center;
`

// * --------------------------------------------------------------------------- component

export const Ruler: React.FC = () => {
  const ref = useRef() as React.MutableRefObject<HTMLCanvasElement>
  const { draw, width, height } = useRulerService()

  useEffect(() => {
    if (ref?.current) {
      const ctx = ref.current.getContext('2d')
      ctx && draw(ctx)
    }
  }, [ref])

  return <canvas css={RulerStyle} ref={ref} width={width} height={height} />
}
