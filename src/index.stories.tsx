import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Ruler } from './index'

// * --------------------------------------------------------------------------- main

export default {
  title: 'Ruler',
  component: Ruler,
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: ['Vertical', 'Horizontal']
      }
    }
  }
} as Meta

const lines = [
  { x: 30 },
  { x: 60 },
  { x: 120 },
  { x: 250 },
  { x: 300 },
  { x: 410 },
  { x: 590 },
  { y: 14 },
  { y: 40 },
  { y: 160 },
  { y: 210 },
  { y: 380 }
]

const handleLinesChange = (val: any) => {
  console.log(val, 111111111)
}

const Template: Story<{ direction: 'Vertical' | 'Horizontal' }> = (args) => (
  <Ruler width={600} height={400} lines={lines} scale={1} rulerBreadth={20} setLines={handleLinesChange} />
)

// * --------------------------------------------------------------------------- index

export const Example = Template.bind({})
Example.args = {
  direction: 'Vertical'
}
Example.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}
