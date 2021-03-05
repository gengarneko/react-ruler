/**
 * 绘制小刻度
 *
 * 竖直的时候，从其起始坐标，每隔一段向上绘制
 * 水平的时候，从其起始坐标，每隔一段向左绘制
 *
 * NOTICE: 绘制的样式写死，后期有扩展需求，可以修改此函数
 *
 * @export
 * @param { CanvasRenderingContext2D } ctx 画布上下文
 * @param { number } scale 缩放比例
 * @param { {x: number, y: number} } startPos 起始坐标
 * @param { number } space 间距
 * @param { number } length 长度
 * @param { boolean } isVertical 是否是垂直方向
 * @param { number } startValue 起始刻度值
 * @param { number } endValue 终止刻度值
 * @param { string } color 颜色
 * @param { boolean | undefined } isSmall 是否是小刻度，用来避免和大刻度重合
 * @return
 */
/* eslint-disable */
export const drawRulerScale = ({
  ctx,
  scale,
  startPos,
  space,
  length,
  isVertical,
  startValue,
  endValue,
  color,
  isSmall
}: {
  ctx: CanvasRenderingContext2D
  scale: number
  startPos: {
    x: number
    y: number
  }
  space: number
  length: number
  isVertical?: boolean
  startValue: number
  endValue: number
  color: string
  isSmall?: boolean
}) => {
  // 创建新路径
  ctx.beginPath()
  // 设置刻度颜色
  ctx.strokeStyle = color

  // 规划子路径
  for (let value = startValue, count = 0; value < endValue; value += space, count++) {
    // 当前路径起始位置（+ 0.5 增强绘制清晰度）
    const currentPos = {
      x: isVertical ? startPos.x + count * space * scale + 0.5 : startPos.x,
      y: isVertical ? startPos.y : startPos.y + count * space + 0.5
    }
    // 从 (x, y) 坐标开始一段子路径
    ctx.moveTo(currentPos.x, currentPos.y)
    // 小刻度和大刻度重合时，不绘制小刻度
    if ((isSmall && value % (space * 10) !== 0) || !isSmall) {
      ctx.lineTo(isVertical ? currentPos.x : currentPos.x - length, isVertical ? currentPos.y - length : currentPos.y)
    }
  }
  // 绘制路径
  ctx.stroke()

  // 结束此路径
  ctx.closePath()
}
