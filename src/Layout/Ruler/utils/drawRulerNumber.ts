// 10 / 12 显示更小的数值，暂时写死
const FONT_SCALE = 0.83

/**
 * 绘制刻度值数字
 *
 * @export
 * @param {}
 * @return
 */
/* eslint-disable */
export const drawRulerNumber = ({
  ctx,
  scale,
  ratio,
  startPos,
  space,
  isVertical,
  startValue,
  endValue,
  color
}: {
  ctx: CanvasRenderingContext2D
  scale: number
  ratio: number
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
  // 文字颜色设置
  ctx.fillStyle = color

  // 规划子路径
  for (let value = startValue, count = 0; value < endValue; value += space, count++) {
    // 当前路径起始位置（+ 0.5 增强绘制清晰度）
    const currentPos = {
      x: isVertical ? startPos.x + count * space * scale + 0.5 : startPos.x,
      y: isVertical ? startPos.y : startPos.y + count * space + 0.5
    }

    if (isVertical) {
      ctx.moveTo(currentPos.x, currentPos.y)
      ctx.save()
      // 平移
      ctx.translate(currentPos.x, currentPos.y * 0.1)
      // 根据分辨率缩放
      ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio)
      // 根据分辨率缩放
      ctx.fillText(String(value), 4 * ratio, 7 * ratio)
      ctx.restore()
      ctx.lineTo(currentPos.x, 0)
    } else {
      ctx.moveTo(currentPos.x, currentPos.y)
      ctx.save()
      ctx.translate(currentPos.x * 0.1, currentPos.y)
      // 旋转 -90 度
      ctx.rotate(-Math.PI / 2)
      // 根据分辨率缩放
      ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio)
      // 根据分辨率缩放
      ctx.fillText(String(value), 4 * ratio, 7 * ratio)
      ctx.restore()
      ctx.lineTo(0, currentPos.y)
    }
  }

  // 绘制路径
  ctx.stroke()
  // 结束路径
  ctx.closePath()
}
