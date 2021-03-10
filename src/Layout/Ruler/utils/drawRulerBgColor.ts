/**
 * 绘制背景色
 *
 * @export
 * @param { CanvasRenderingContext2D } ctx 画布上下文
 * @param { number } height 高度
 * @param { number } width 宽度
 * @param { string } color 颜色
 * @return
 */
/* eslint-disable */
export const drawRulerBgColor = ({
  ctx,
  height,
  width,
  color
}: {
  ctx: CanvasRenderingContext2D
  height: number
  width: number
  color: string
}) => {
  // 填充背景色
  ctx.fillStyle = color
  // 绘制背景区域
  ctx.fillRect(0, 0, width, height)
}
