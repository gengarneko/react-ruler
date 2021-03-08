import React, { useState } from 'react'
import { Ruler, LineType } from '../index'

const initLines = [
  { x: 30, y: undefined },
  { x: 32, y: undefined },
  { x: 120, y: undefined },
  { x: 250, y: undefined },
  { x: 300, y: undefined },
  { x: 410, y: undefined },
  { x: 590, y: undefined },
  { x: undefined, y: 42 },
  { x: undefined, y: 40 },
  { x: undefined, y: 160 },
  { x: undefined, y: 210 },
  { x: undefined, y: 380 }
]

export const Example: React.FC = () => {
  const [lines, setLines] = useState<LineType[]>(initLines)

  const onLinesChange = (lines: any) => {
    console.log(lines, 434343434)
    setLines(lines)
  }

  return <Ruler width={600} height={400} lines={lines} scale={1} breadth={20} setLines={onLinesChange} />
}
