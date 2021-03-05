import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Ruler } from './Ruler'

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

const Template: Story<{ direction: 'Vertical' | 'Horizontal' }> = (args) => (
  <Ruler />
)

// * --------------------------------------------------------------------------- verticcal

export const Vertical = Template.bind({})
Vertical.args = {
  direction: 'Vertical'
}
Vertical.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}

// * --------------------------------------------------------------------------- horizontal

export const Horizontal = Template.bind({})
Horizontal.args = {
  direction: 'Horizontal'
}
Horizontal.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}

// * --------------------------------------------------------------------------- index

export const GroupExample = Template.bind({})
GroupExample.args = {
  direction: 'Horizontal'
}
GroupExample.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}
