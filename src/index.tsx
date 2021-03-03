import * as React from 'react'
import { jsx, css } from '@emotion/react'

interface ExampleComponentProps {
  text: string
}

/** @jsx jsx */
const ExampleComponentStyle = css`
  margin: 2em;
  padding: 0.5em;
  border: 2px solid #000;
  font-size: 2em;
  text-align: center;
`

export const ExampleComponent: React.FC<ExampleComponentProps> = (props) => {
  const { text } = props
  return <div css={ExampleComponentStyle}>Example Component: {text}</div>
}
