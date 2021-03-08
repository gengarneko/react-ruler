import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Ruler } from './index'
import { Example } from './example'

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

const Template: Story<{ direction: 'Vertical' | 'Horizontal' }> = (args) => <Example />

export const Index = Template.bind({})
Index.args = {
  direction: 'Vertical'
}
Index.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}
