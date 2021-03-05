/**
 * 根据辅助线值计算方向
 *
 * 并且转换成方便渲染的数据
 *
 * @export
 * @param { { x: number, y: undefined } | { x: undefined, y: number } } lineValue
 * @return
 */
export const calcLineData = (
  lineValue: { x: number; y: undefined } | { x: undefined; y: number }
): { key: string; value: number; vertical: boolean } => {
  return lineValue.x !== undefined
    ? {
        key: `x#${lineValue.x}`,
        value: lineValue.x,
        vertical: true
      }
    : {
        key: `y#${lineValue.y}`,
        value: lineValue.y,
        vertical: false
      }
}
