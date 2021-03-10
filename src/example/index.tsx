import React, { useState } from 'react'
import { Ruler, LineType } from '../index'

const initLines = [
  { key: '1', x: 30, y: undefined },
  { key: '3', x: 120, y: undefined },
  { key: '10', x: undefined, y: 160 },
  { key: '12', x: undefined, y: 380 }
]

export const Example: React.FC = () => {
  const [lines, setLines] = useState<LineType[]>(initLines)
  const onLinesChange = (lines: any) => setLines(lines)
  return (
    <Ruler
      width={700}
      height={500}
      lineList={lines}
      setLineList={onLinesChange}
      scale={1}
      breadth={20}
      startPoint={{ x: -120, y: 80 }}
    />
  )
}
